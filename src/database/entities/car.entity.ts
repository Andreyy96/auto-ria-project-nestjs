import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarID, UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';
import { ViewEntity } from './view.entity';

@Entity({ name: TableNameEnum.CARS })
export class CarEntity extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: CarID;

  @Column('text')
  brand: string;

  @Column('text')
  model: string;

  @Column('text')
  user_price: string;

  @Column('text')
  user_ccy: string;

  @Column('text')
  region: string;

  @Column('text', { nullable: true })
  image: string;

  @Column('text')
  price: string;

  @Column('text', { default: 'UAH' })
  base_ccy: string;

  @Column('text', { nullable: true })
  rate: string;

  @Column('text', { default: false })
  isActive: boolean;

  @Column('text', { default: 0 })
  view: string;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @OneToMany(() => ViewEntity, (entity) => entity.car)
  views?: ViewEntity[];
}
