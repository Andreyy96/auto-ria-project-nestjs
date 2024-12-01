import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import LocalStorage from 'node-localstorage';
import { EntityManager } from 'typeorm';

import { PRIVATE_BANK_URL } from '../../../common/constants/private-bank-info.constant';
import { UserRoleEnum } from '../../../common/enums/user-role.enum';
import { CarID, UserID } from '../../../common/types/entity-ids.type';
import { CarEntity } from '../../../database/entities/car.entity';
import { ViewEntity } from '../../../database/entities/view.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { EmailService } from '../../email/email.service';
import { EmailTypeEnum } from '../../email/enums/email-type.enum';
import { ContentType } from '../../file-storage/models/enums/content-type.enum';
import { FileStorageService } from '../../file-storage/services/file.storage.service';
import { LoggerService } from '../../logger/logger.service';
import { CarRepository } from '../../repository/services/car.repository';
import { ManagerRepository } from '../../repository/services/manager.repository';
import { SoldCarRepository } from '../../repository/services/sold-car.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ViewRepository } from '../../repository/services/view.repository';
import { TypeUserAccountEnum } from '../../user/models/enums/type-user-account.enum';
import { listBadWords } from '../lib/array_badwords';
import { CarListReqDto } from '../models/dto/req/car-list.req.dto';
import { CreateCarReqDto } from '../models/dto/req/create-car.req.dto';
import { CarResDto } from '../models/dto/res/car.res.dto';
import { CarListResDto } from '../models/dto/res/car-list.res.dto';
import { StatisticCarResDto } from '../models/dto/res/statistic-car.res.dto';
import { TypeCurrency } from '../models/enums/TypeCurrency';
import { IResPrivateBunk } from '../models/interfaces/res-private_bunk.interface';
import { CarMapper } from './car.mapper';

@Injectable()
export class CarService {
  constructor(
    private readonly logger: LoggerService,
    private readonly carRepository: CarRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly userRepository: UserRepository,
    private readonly httpService: HttpService,
    private readonly soldCarRepository: SoldCarRepository,
    private readonly viewRepository: ViewRepository,
    private readonly emailService: EmailService,
    private readonly managerRepository: ManagerRepository,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  public async getList(query: CarListReqDto): Promise<CarListResDto> {
    const [entities, total] = await this.carRepository.getList(query);
    return CarMapper.toListResponseDTO(entities, total, query);
  }

  public async getNoActiveList(
    userData: IUserData,
    query: CarListReqDto,
  ): Promise<CarListResDto> {
    if (
      userData.role !== UserRoleEnum.ADMIN &&
      userData.role !== UserRoleEnum.MANAGER
    ) {
      throw new ForbiddenException();
    }
    const [entities, total] = await this.carRepository.getNoActiveList(query);
    return CarMapper.toListResponseDTO(entities, total, query);
  }

  public async create(
    userData: IUserData,
    dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    const user = await this.findUser(userData);

    const cars = await this.carRepository.findBy({
      user_id: userData.userId as UserID,
    });

    if (user.account !== TypeUserAccountEnum.PREMIUM && cars.length >= 1) {
      throw new ForbiddenException();
    }

    const isActive = this.checkBadWords(dto, userData);

    const result = await this.getRateAndPrice(dto);

    const car = await this.carRepository.save(
      this.carRepository.create({
        ...dto,
        price: result.price.toString(),
        rate: result.rate,
        isActive,
        user_id: userData.userId as UserID,
      }),
    );

    if (!isActive) {
      const manager = await this.managerRepository.findOneBy({
        role: UserRoleEnum.MANAGER,
      });

      await this.emailService.sendEmail(
        userData.email,
        EmailTypeEnum.NO_ACTIVE_CAR,
        { car_id: car.id },
        manager.email,
      );
    }

    return CarMapper.toResponseCreateDTO(car);
  }

  public async getById(carId: string): Promise<CarResDto> {
    return await this.entityManager.transaction('SERIALIZABLE', async (em) => {
      const viewRepository = em.getRepository(ViewEntity);
      const car = await this.carRepository.findCarById(carId, em);

      if (!car) {
        throw new NotFoundException('Car not found');
      }
      const view = +car.view + 1;

      await this.carRepository.update(car.id, { view: view.toString() });

      await viewRepository.save(
        viewRepository.create({
          car_id: car.id,
        }),
      );

      return CarMapper.toResponseDTO(car);
    });
  }

  public async deleteById(userData: IUserData, carId: CarID): Promise<void> {
    const car = await this.findCarByIdOrThrow(userData.userId as UserID, carId);
    if (userData.userId !== car.user_id) {
      throw new ForbiddenException();
    }
    await this.viewRepository.delete({ car_id: car.id });
    await this.carRepository.remove(car);
  }

  public async uploadImage(
    userData: IUserData,
    car_image: Express.Multer.File,
    carId: CarID,
  ): Promise<void> {
    const car = await this.findCarByIdOrThrow(userData.userId as UserID, carId);

    const image = await this.fileStorageService.uploadFile(
      car_image,
      ContentType.CAR_IMAGE,
      car.id,
    );

    await this.carRepository.update(car.id, { image });
  }

  public async deleteImage(userData: IUserData, carId: CarID): Promise<void> {
    const car = await this.findCarByIdOrThrow(userData.userId as UserID, carId);

    if (car.image) {
      await this.fileStorageService.deleteFile(car.image);
      await this.carRepository.save(
        this.carRepository.merge(car, { image: null }),
      );
    }
  }

  public async sellById(userData: IUserData, carId: CarID): Promise<void> {
    const car = await this.findCarByIdOrThrow(userData.userId as UserID, carId);

    if (!car.isActive) {
      throw new BadRequestException();
    }

    await Promise.all([
      await this.soldCarRepository.save(
        this.soldCarRepository.create({
          brand: car.brand,
          model: car.model,
          price: car.price,
          region: car.region,
          user_id: userData.userId as UserID,
        }),
      ),
      await this.carRepository.remove(car),
    ]);
  }

  private async findCarByIdOrThrow(
    userId: UserID,
    carId: CarID,
  ): Promise<CarEntity> {
    const car = await this.carRepository.findOneBy({ id: carId });

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    if (car.user_id !== userId) {
      throw new ForbiddenException();
    }
    return car;
  }

  public async getStatistic(
    userData: IUserData,
    carId: CarID,
  ): Promise<StatisticCarResDto> {
    const user = await this.findUser(userData);

    if (user.account !== TypeUserAccountEnum.PREMIUM) {
      throw new ForbiddenException();
    }

    const car = await this.carRepository.findCarById(carId);

    if (!car) {
      throw new NotFoundException('Car not found');
    }

    const viewsForWeek = await this.viewRepository.getViewsByWeek(carId);
    const viewsForMonth = await this.viewRepository.getViewsByMonth(carId);
    const viewsForYear = await this.viewRepository.getViewsByYear(carId);

    const soldCarsByRegion = await this.carRepository.getAvgPriceByRegion(
      car.model,
      car.region,
    );

    const soldCars = await this.carRepository.getAvgPrice(car.model);

    const avgPriceByRegion = Math.round(this.avg(soldCarsByRegion));
    const avgPrice = Math.round(this.avg(soldCars));

    return CarMapper.toResponseStatistic(
      avgPrice,
      avgPriceByRegion,
      +car.view,
      viewsForWeek.length,
      viewsForMonth.length,
      viewsForYear.length,
    );
  }

  private avg(soldCars: CarEntity[]): number {
    let avgP = 0;
    for (const soldCar of soldCars) {
      const price = +soldCar.price;
      avgP += price;
    }

    return avgP / soldCars.length;
  }

  private checkBadWords(dto: CreateCarReqDto, userData: IUserData): boolean {
    const localStorage = new LocalStorage.LocalStorage('./tries');
    const tries = JSON.parse(localStorage.getItem(`${userData.userId}`)) || 0;

    let isActive: boolean;
    if (
      (listBadWords.includes(dto.brand) || listBadWords.includes(dto.model)) &&
      tries < 3
    ) {
      localStorage.setItem(`${userData.userId}`, JSON.stringify(tries + 1));
      throw new BadRequestException();
    } else if (tries >= 3) {
      isActive = false;
      localStorage.removeItem(`${userData.userId}`);
    } else {
      localStorage.removeItem(`${userData.userId}`);
      isActive = true;
    }

    return isActive;
  }

  private async findUser(userData: IUserData) {
    const user = await this.userRepository.findOneBy({
      id: userData.userId as UserID,
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  private async getRateAndPrice(dto: CreateCarReqDto) {
    let price: number;
    let rate: string;

    const { data } =
      await this.httpService.axiosRef.get<IResPrivateBunk[]>(PRIVATE_BANK_URL);

    if (dto.user_ccy !== TypeCurrency.UAH) {
      const findCurrency = data.find((value) => value.ccy === dto.user_ccy);

      if (!findCurrency) {
        throw new NotFoundException();
      }

      price = +dto.user_price * findCurrency.sale;
      rate = findCurrency.sale.toString();
    }

    if (dto.user_ccy === TypeCurrency.UAH) {
      price = +dto.user_price;
    }

    return { price: Math.round(price), rate };
  }
}
