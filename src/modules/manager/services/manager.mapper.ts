import * as process from 'node:process';

import { ManagerEntity } from '../../../database/entities/manager.entity';
import { ManagerResDto } from '../dto/res/manager.res.dto';

export class ManagerMapper {
  public static toResponseDTO(manger: ManagerEntity): ManagerResDto {
    return {
      id: manger.id,
      name: manger.name,
      email: manger.email,
      role: manger.role,
      image: manger.image
        ? `${process.env.AWS_S3_BUCKET_URL}/${manger.image}`
        : null,
    };
  }
}
