import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserRoleEnum } from '../../common/enums/user-role.enum';
import { UserID } from '../../common/types/entity-ids.type';
import { TypeUserAccountEnum } from '../../modules/user/models/enums/type-user-account.enum';
import { AccessTokenEntity } from './access-token.entity';
import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { SoldCarEntity } from './sold-car.entity';

@Entity({ name: TableNameEnum.USERS })
export class UserEntity extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: UserID;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('enum', { enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @Column('text', { unique: true, nullable: true })
  phone: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column('text', { default: false })
  isBanned: boolean;

  @Column('text', { default: TypeUserAccountEnum.BASE })
  account: TypeUserAccountEnum;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => AccessTokenEntity, (entity) => entity.user)
  accessTokens?: AccessTokenEntity[];

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars?: CarEntity[];

  @OneToMany(() => SoldCarEntity, (entity) => entity.user)
  soldCars?: SoldCarEntity[];
}
