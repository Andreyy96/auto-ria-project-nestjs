import { UserRoleEnum } from '../../src/common/enums/user-role.enum';
import { UserID } from '../../src/common/types/entity-ids.type';
import { UserEntity } from '../../src/database/entities/user.entity';
import { IUserData } from '../../src/modules/auth/models/interfaces/user-data.interface';
import { BrandReqDto } from '../../src/modules/manager/dto/req/brand.req.dto';
import { UpdateUserReqDto } from '../../src/modules/user/models/dto/req/update-user.req.dto';
import { UserResDto } from '../../src/modules/user/models/dto/res/user.res.dto';
import { TypeUserAccountEnum } from '../../src/modules/user/models/enums/type-user-account.enum';

export class UserMock {
  static userData(properties?: Partial<IUserData>): IUserData {
    return {
      userId: 'testId' as UserID,
      email: 'test@mail.com',
      role: 'user',
      deviceId: 'testDeviceId',
      ...(properties || {}),
    };
  }

  static avatarData(properties?: Express.Multer.File): Express.Multer.File {
    return {
      buffer: undefined,
      destination: '',
      encoding: '',
      fieldname: '',
      filename: '',
      mimetype: '',
      originalname: '',
      path: '',
      size: 0,
      stream: undefined,
      ...(properties || {}),
    };
  }

  static testId = 'testId' as UserID;
  static brand = 'bmc';

  static dtoBrand(properties?: Partial<BrandReqDto>): BrandReqDto {
    return {
      brand: 'bmc',
      ...(properties || {}),
    };
  }

  static userEntity(properties?: Partial<UserEntity>): UserEntity {
    return {
      id: 'testId' as UserID,
      email: 'test@mail.com',
      image: 'testImage',
      name: 'testName',
      password: 'testPassword',
      created: new Date('2021-01-01'),
      updated: new Date('2021-01-01'),
      role: UserRoleEnum.USER,
      phone: '+3800988775',
      isBanned: false,
      account: TypeUserAccountEnum.BASE,
      ...(properties || {}),
    };
  }

  static updateUserReqDto(
    properties?: Partial<UpdateUserReqDto>,
  ): UpdateUserReqDto {
    return {
      name: 'testName',
      phone: '+3800988776',
      ...(properties || {}),
    };
  }

  static updateAccountDto(properties?: Partial<UserEntity>): {
    account: TypeUserAccountEnum;
  } {
    return {
      account: TypeUserAccountEnum.PREMIUM,
      ...(properties || {}),
    };
  }

  static toResponseDTO(properties?: Partial<UserResDto>): UserResDto {
    return {
      id: 'testId',
      email: 'test@mail.com',
      image: 'https://example-bucket-url.com/testImage',
      name: 'testName',
      role: UserRoleEnum.USER,
      phone: '+3800988775',
      ...(properties || {}),
    };
  }

  static toUpdateResponseDTO(properties?: Partial<UserResDto>): UserResDto {
    return {
      id: 'testId',
      email: 'test@mail.com',
      image: 'https://example-bucket-url.com/testImage',
      name: 'testName',
      role: UserRoleEnum.USER,
      phone: '+3800988776',
      ...(properties || {}),
    };
  }
}
