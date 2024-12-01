import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserRoleEnum } from '../../../common/enums/user-role.enum';
import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { CarService } from '../../car/services/car.service';
import { EmailService } from '../../email/email.service';
import { EmailTypeEnum } from '../../email/enums/email-type.enum';
import { ContentType } from '../../file-storage/models/enums/content-type.enum';
import { FileStorageService } from '../../file-storage/services/file.storage.service';
import { LoggerService } from '../../logger/logger.service';
import { AccessTokenRepository } from '../../repository/services/access-token.repository';
import { CarRepository } from '../../repository/services/car.repository';
import { ManagerRepository } from '../../repository/services/manager.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';
import { UserResDto } from '../models/dto/res/user.res.dto';
import { TypeUserAccountEnum } from '../models/enums/type-user-account.enum';
import { UsersMapper } from './users.mapper';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly emailService: EmailService,
    private readonly managerRepository: ManagerRepository,
    private readonly carService: CarService,
    private readonly carRepository: CarRepository,
    private readonly accessTokenRepository: AccessTokenRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async getMe(userData: IUserData): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({
      id: userData.userId as UserID,
    });
    return UsersMapper.toResponseDTO(user);
  }

  public async getById(id: UserID): Promise<UserResDto> {
    const user = await this.isUserExist(id);
    return UsersMapper.toResponseDTO(user);
  }

  public async updateMe(
    userData: IUserData,
    updateUserDto: UpdateUserReqDto,
  ): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({
      id: userData.userId as UserID,
    });

    const updateUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    return UsersMapper.toResponseDTO(updateUser);
  }

  public async removeMe(userData: IUserData): Promise<void> {
    const user = await this.isUserExist(userData.userId as UserID);

    const cars = await this.carRepository.findBy({ user_id: user.id });

    for (const car of cars) {
      await this.carService.deleteById(userData, car.id);
    }

    await this.accessTokenRepository.delete({ user_id: user.id });
    await this.refreshTokenRepository.delete({ user_id: user.id });

    await this.userRepository.remove(user);
  }

  public async sendEmail(userData: IUserData, brand: string): Promise<void> {
    const user = await this.userRepository.findOneBy({
      id: userData.userId as UserID,
    });

    const manager = await this.managerRepository.findOneBy({
      role: UserRoleEnum.MANAGER,
    });

    await this.emailService.sendEmail(
      user.email,
      EmailTypeEnum.ADD_BRAND,
      {
        name: user.name,
        brand,
      },
      manager.email,
    );
  }

  public async uploadAvatar(
    userData: IUserData,
    avatar: Express.Multer.File,
  ): Promise<void> {
    const image = await this.fileStorageService.uploadFile(
      avatar,
      ContentType.IMAGE,
      userData.userId,
    );

    await this.userRepository.update(userData.userId, { image });
  }

  public async deleteAvatar(userData: IUserData): Promise<void> {
    const user = await this.userRepository.findOneBy({
      id: userData.userId as UserID,
    });

    if (user.image) {
      await this.fileStorageService.deleteFile(user.image);
      await this.userRepository.save(
        this.userRepository.merge(user, { image: null }),
      );
    }
  }

  public async buyPremiumAccount(userData: IUserData): Promise<void> {
    const user = await this.userRepository.findOneBy({
      id: userData.userId as UserID,
    });

    await this.userRepository.update(user.id, {
      account: TypeUserAccountEnum.PREMIUM,
    });
  }

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email is already taken');
    }
  }

  private async isUserExist(id: UserID): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
