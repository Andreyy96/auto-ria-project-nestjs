import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  VirtualColumn,
} from 'typeorm';

import { CarID, ViewID } from '../../common/types/entity-ids.type';
import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';

@Entity({ name: TableNameEnum.VIEWS })
export class ViewEntity extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: ViewID;

  @Column()
  car_id: CarID;
  @ManyToOne(() => CarEntity, (entity) => entity.views)
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;

  @VirtualColumn({ query: () => 'NULL' })
  viewsWeekCount: number;

  @VirtualColumn({ query: () => 'NULL' })
  viewsMonthCount: number;

  @VirtualColumn({ query: () => 'NULL' })
  viewsYearCount: number;
}
