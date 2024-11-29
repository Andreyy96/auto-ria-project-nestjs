import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BrandID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';

@Entity({ name: TableNameEnum.BRANDS })
export class BrandEntity extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: BrandID;

  @Column('text')
  name: string;
}
