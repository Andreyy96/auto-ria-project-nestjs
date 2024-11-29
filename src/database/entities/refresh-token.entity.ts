import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  AdminID,
  ManagerID,
  RefreshTokenID,
  UserID,
} from '../../common/types/entity-ids.type';
import { AdminEntity } from './admin.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { ManagerEntity } from './manager.entity';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';

@Entity({ name: TableNameEnum.REFRESH_TOKENS })
export class RefreshTokenEntity extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: RefreshTokenID;

  @Column('text')
  refreshToken: string;

  @Column('text')
  deviceId: string;

  @Column({ nullable: true })
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column({ nullable: true })
  admin_id: AdminID;
  @ManyToOne(() => AdminEntity, (entity) => entity.accessTokens)
  @JoinColumn({ name: 'admin_id' })
  admin?: AdminEntity;

  @Column({ nullable: true })
  manager_id: ManagerID;
  @ManyToOne(() => ManagerEntity, (entity) => entity.accessTokens)
  @JoinColumn({ name: 'manager_id' })
  manager?: ManagerEntity;
}
