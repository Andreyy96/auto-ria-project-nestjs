import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseModel {
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
