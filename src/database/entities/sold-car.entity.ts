import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  VirtualColumn,
} from 'typeorm';

import { SoldCarID, UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity({ name: TableNameEnum.SOLD_CARS })
export class SoldCarEntity extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: SoldCarID;

  @Column('text')
  brand: string;

  @Column('text')
  model: string;

  @Column('text')
  price: string;

  @Column('text')
  region: string;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.soldCars)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @VirtualColumn({ query: () => 'NULL' })
  avgPrice: number;

  @VirtualColumn({ query: () => 'NULL' })
  avgPriceByRegion: number;
}
