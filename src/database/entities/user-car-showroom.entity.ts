import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserRoleEnum } from '../../common/enums/user-role.enum';
import {
  CarShowroomID,
  UserCarShowroomID,
} from '../../common/types/entity-ids.type';
import { TypeUserAccountEnum } from '../../modules/user/models/enums/type-user-account.enum';
import { CarShowroomEntity } from './car-showroom.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';

@Entity({ name: TableNameEnum.USERS_CAR_SHOWROOM })
export class UserCarShowroomEntity extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: UserCarShowroomID;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('enum', { enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @Column('text', { unique: true })
  phone: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column('text', { default: false })
  isBaned: boolean;

  @Column('text', { default: TypeUserAccountEnum.BASE })
  account: TypeUserAccountEnum;

  @Column()
  car_showroom_id: CarShowroomID;
  @ManyToOne(() => CarShowroomEntity, (entity) => entity.users)
  @JoinColumn({ name: 'car_showroom_id' })
  carShowroom?: CarShowroomEntity;
}
