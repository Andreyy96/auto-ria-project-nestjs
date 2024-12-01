import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { CarListReqDto } from '../../car/models/dto/req/car-list.req.dto';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarEntity, dataSource.manager);
  }

  public async getList(query: CarListReqDto): Promise<[CarEntity[], number]> {
    const qb = this.createQueryBuilder('car');
    qb.andWhere('car.isActive = :is_active');
    qb.leftJoinAndSelect('car.user', 'user');

    if (query.search) {
      qb.andWhere('CONCAT(LOWER(car.brand), LOWER(car.model)) LIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    qb.setParameter('is_active', true);

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async getNoActiveList(
    query: CarListReqDto,
  ): Promise<[CarEntity[], number]> {
    const qb = this.createQueryBuilder('car');
    qb.andWhere('car.isActive = :is_active');
    qb.leftJoinAndSelect('car.user', 'user');

    if (query.search) {
      qb.andWhere('CONCAT(LOWER(car.brand), LOWER(car.model)) LIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    qb.setParameter('is_active', false);

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findCarById(
    carId: string,
    em?: EntityManager,
  ): Promise<CarEntity> {
    const repo = em ? em.getRepository(CarEntity) : this;

    const qb = repo.createQueryBuilder('car');
    qb.leftJoinAndSelect('car.user', 'user');

    qb.andWhere('car.id = :carId');
    qb.setParameter('carId', carId);

    return await qb.getOne();
  }

  public async getCarsNotUAH(): Promise<CarEntity[]> {
    const qb = this.createQueryBuilder('car');

    qb.andWhere('car.isActive = :isActive AND car.user_ccy != :ccy');
    qb.setParameter('isActive', 'true');
    qb.setParameter('ccy', 'UAH');

    return await qb.getMany();
  }

  public async getAvgPriceByRegion(
    model: string,
    region: string,
  ): Promise<CarEntity[]> {
    const qb = this.createQueryBuilder('car');

    qb.where(
      'car.model = :model AND car.region = :region AND car.isActive = :isActive',
    );

    qb.setParameter('model', model);
    qb.setParameter('region', region);
    qb.setParameter('isActive', 'true');

    return await qb.getMany();
  }

  public async getAvgPrice(model: string): Promise<CarEntity[]> {
    const qb = this.createQueryBuilder('car');

    qb.where('car.model = :model AND car.isActive = :isActive');

    qb.setParameter('model', model);
    qb.setParameter('isActive', 'true');

    return await qb.getMany();
  }
}
