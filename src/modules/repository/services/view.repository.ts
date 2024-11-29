import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TimeHelper } from '../../../common/helpers/time.helper';
import { CarID } from '../../../common/types/entity-ids.type';
import { ViewEntity } from '../../../database/entities/view.entity';

@Injectable()
export class ViewRepository extends Repository<ViewEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ViewEntity, dataSource.manager);
  }

  public async getViewsByWeek(carId: CarID): Promise<ViewEntity[]> {
    const qb = this.createQueryBuilder('view');
    qb.leftJoin('view.car', 'car');

    qb.andWhere('view.car_id = :carId AND view.created >= :time');

    qb.setParameter('carId', carId);
    qb.setParameter('time', TimeHelper.subtractByParams(7, 'day'));

    return await qb.getMany();
  }

  public async getViewsByMonth(carId: CarID): Promise<ViewEntity[]> {
    const qb = this.createQueryBuilder('view');
    qb.leftJoin('view.car', 'car');

    qb.andWhere('view.car_id = :carId AND view.created >= :time');

    qb.setParameter('carId', carId);
    qb.setParameter('time', TimeHelper.subtractByParams(1, 'month'));

    return await qb.getMany();
  }

  public async getViewsByYear(carId: CarID): Promise<ViewEntity[]> {
    const qb = this.createQueryBuilder('view');
    qb.leftJoin('view.car', 'car');

    qb.andWhere('view.car_id = :carId AND view.created >= :time');

    qb.setParameter('carId', carId);
    qb.setParameter('time', TimeHelper.subtractByParams(1, 'year'));

    return await qb.getMany();
  }
}
