import { AdminEntity } from '../../../database/entities/admin.entity';
import { ManagerEntity } from '../../../database/entities/manager.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { AdminMapper } from '../../admin/services/admin.mapper';
import { ManagerMapper } from '../../manager/services/manager.mapper';
import { UsersMapper } from '../../user/services/users.mapper';
import {
  AuthAdminResDto,
  AuthManagerResDto,
  AuthResDto,
} from '../models/dto/res/auth.res.dto';
import { ITokenPair } from '../models/interfaces/token-pair.interface';
import { IUserData } from '../models/interfaces/user-data.interface';

export class AuthMapper {
  public static toResponseDTO(
    user: UserEntity,
    tokenPair: ITokenPair,
  ): AuthResDto {
    return {
      user: UsersMapper.toResponseDTO(user),
      tokens: this.toResponseRefreshDTO(tokenPair),
    };
  }

  public static toResponseAdminDTO(
    admin: AdminEntity,
    tokenPair: ITokenPair,
  ): AuthAdminResDto {
    return {
      admin: AdminMapper.toResponseDTO(admin),
      tokens: this.toResponseRefreshDTO(tokenPair),
    };
  }

  public static toResponseManagerDTO(
    manager: ManagerEntity,
    tokenPair: ITokenPair,
  ): AuthManagerResDto {
    return {
      manager: ManagerMapper.toResponseDTO(manager),
      tokens: this.toResponseRefreshDTO(tokenPair),
    };
  }

  public static toResponseRefreshDTO(tokenPair: ITokenPair): ITokenPair {
    return {
      accessToken: tokenPair.accessToken,
      refreshToken: tokenPair.refreshToken,
    };
  }

  public static toUserDataDTO(user: UserEntity, deviceId: string): IUserData {
    return {
      role: user.role,
      userId: user.id,
      email: user.email,
      deviceId,
    };
  }

  public static toManagerDataDTO(
    manager: ManagerEntity,
    deviceId: string,
  ): IUserData {
    return {
      role: manager.role,
      userId: manager.id,
      email: manager.email,
      deviceId,
    };
  }

  public static toAdminDataDTO(
    admin: AdminEntity,
    deviceId: string,
  ): IUserData {
    return {
      role: admin.role,
      userId: admin.id,
      email: admin.email,
      deviceId,
    };
  }
}
