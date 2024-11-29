import * as process from 'node:process';

import { AdminEntity } from '../../../database/entities/admin.entity';
import { AdminResDto } from '../dto/res/admin.res.dto';

export class AdminMapper {
  public static toResponseDTO(admin: AdminEntity): AdminResDto {
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      image: admin.image
        ? `${process.env.AWS_S3_BUCKET_URL}/${admin.image}`
        : null,
    };
  }
}
