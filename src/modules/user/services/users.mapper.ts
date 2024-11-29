import * as process from 'node:process';

import { UserEntity } from '../../../database/entities/user.entity';
import { UserResDto } from '../models/dto/res/user.res.dto';

export class UsersMapper {
  public static toResponseDTO(user: UserEntity): UserResDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      image: user.image
        ? `${process.env.AWS_S3_BUCKET_URL}/${user.image}`
        : null,
    };
  }
}
