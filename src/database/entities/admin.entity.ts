import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserRoleEnum } from '../../common/enums/user-role.enum';
import { AdminID } from '../../common/types/entity-ids.type';
import { AccessTokenEntity } from './access-token.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity({ name: TableNameEnum.ADMINS })
export class AdminEntity extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: AdminID;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('enum', { enum: UserRoleEnum, default: UserRoleEnum.ADMIN })
  role: UserRoleEnum;

  @Column('text', { nullable: true })
  image?: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.admin)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => AccessTokenEntity, (entity) => entity.admin)
  accessTokens?: AccessTokenEntity[];
}
