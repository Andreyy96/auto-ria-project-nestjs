import { UserRoleEnum } from '../../src/common/enums/user-role.enum';
import { ManagerID } from '../../src/common/types/entity-ids.type';
import { ManagerEntity } from '../../src/database/entities/manager.entity';

export class ManagerMock {
  static managerEntity(properties?: Partial<ManagerEntity>): ManagerEntity {
    return {
      id: 'testsId' as ManagerID,
      email: 'testMANAGER@mail.com',
      image: 'testImage',
      name: 'testName',
      password: 'testPassword',
      created: new Date('2021-01-01'),
      updated: new Date('2021-01-01'),
      role: UserRoleEnum.MANAGER,
      ...(properties || {}),
    };
  }
}
