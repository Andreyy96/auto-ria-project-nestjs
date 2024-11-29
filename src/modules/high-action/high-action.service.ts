import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { UserRoleEnum } from '../../common/enums/user-role.enum';
import { UserID } from '../../common/types/entity-ids.type';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { BrandRepository } from '../repository/services/brand.repository';
import { UserRepository } from '../repository/services/user.repository';

@Injectable()
export class HighActionService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly brandRepository: BrandRepository,
  ) {}

  public async bannedUser(userData: IUserData, userId: UserID) {
    this.checkRole(userData.role);

    await this.userRepository.update(userId, { isBanned: true });
  }

  public async unbannedUser(userData: IUserData, userId: UserID) {
    this.checkRole(userData.role);

    await this.userRepository.update(userId, { isBanned: false });
  }

  public async addBrand(userData: IUserData, name: string): Promise<void> {
    this.checkRole(userData.role);

    const brands = await this.brandRepository.find();

    const isExist = brands.find((brand) => brand.name === name);

    if (isExist) {
      throw new ConflictException();
    }

    await this.brandRepository.save(
      this.brandRepository.create({
        name,
      }),
    );
  }

  private checkRole(role: string): void {
    if (role !== UserRoleEnum.ADMIN && role !== UserRoleEnum.MANAGER) {
      throw new ForbiddenException();
    }
  }
}
