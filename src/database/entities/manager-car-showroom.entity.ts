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
  ManagerCarShowroomID,
} from '../../common/types/entity-ids.type';
import { CarShowroomEntity } from './car-showroom.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';

@Entity({ name: TableNameEnum.MANAGERS_CAR_SHOWROOM })
export class ManagerCarShowroomEntity extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: ManagerCarShowroomID;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('enum', { enum: UserRoleEnum, default: UserRoleEnum.MANAGER })
  role: UserRoleEnum;

  @Column('text', { nullable: true })
  image?: string;

  @Column()
  car_showroom_id: CarShowroomID;
  @ManyToOne(() => CarShowroomEntity, (entity) => entity.managers)
  @JoinColumn({ name: 'car_showroom_id' })
  carShowroom?: CarShowroomEntity;
}
