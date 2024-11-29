import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { SoldCarEntity } from '../../../database/entities/sold-car.entity';

@Injectable()
export class SoldCarRepository extends Repository<SoldCarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(SoldCarEntity, dataSource.manager);
  }

  public async getAvgPriceByRegion(
    model: string,
    region: string,
  ): Promise<SoldCarEntity[]> {
    const qb = this.createQueryBuilder('sold-car');

    qb.where('sold-car.model = :model AND sold-car.region = :region');

    qb.setParameter('model', model);
    qb.setParameter('region', region);

    return await qb.getMany();
  }

  public async getAvgPrice(model: string): Promise<SoldCarEntity[]> {
    const qb = this.createQueryBuilder('sold-car');

    qb.where('sold-car.model = :model');

    qb.setParameter('model', model);

    return await qb.getMany();
  }
}
