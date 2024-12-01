import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { ManagerMock } from '../../../../test/__mocks__/manager.mock';
import { UserMock } from '../../../../test/__mocks__/user.mock';
import { UserRoleEnum } from '../../../common/enums/user-role.enum';
import { UserID } from '../../../common/types/entity-ids.type';
import { CarService } from '../../car/services/car.service';
import { EmailService } from '../../email/email.service';
import { EmailTypeEnum } from '../../email/enums/email-type.enum';
import { FileStorageService } from '../../file-storage/services/file.storage.service';
import { LoggerService } from '../../logger/logger.service';
import { AccessTokenRepository } from '../../repository/services/access-token.repository';
import { CarRepository } from '../../repository/services/car.repository';
import { ManagerRepository } from '../../repository/services/manager.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { mockUsersProviders } from '../__mocks__/users.module';
import { TypeUserAccountEnum } from '../models/enums/type-user-account.enum';
import { UsersMapper } from './users.mapper';
import { UsersService } from './users.service';

describe(UsersService.name, () => {
  let service: UsersService;
  let mockLoggerService: LoggerService;
  let mockUserRepository: UserRepository;
  let mockFileStorageService: FileStorageService;
  let mockEmailService: EmailService;
  let mockManagerRepository: ManagerRepository;
  let mockCarService: CarService;
  let mockCarRepository: CarRepository;
  let mockAccessTokenRepository: AccessTokenRepository;
  let mockRefreshTokenRepository: RefreshTokenRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [...mockUsersProviders, UsersService],
    }).compile();
    service = module.get<UsersService>(UsersService);

    mockLoggerService = module.get<LoggerService>(LoggerService);
    mockUserRepository = module.get<UserRepository>(UserRepository);
    mockFileStorageService = module.get<FileStorageService>(FileStorageService);
    mockEmailService = module.get<EmailService>(EmailService);
    mockManagerRepository = module.get<ManagerRepository>(ManagerRepository);
    mockCarService = module.get<CarService>(CarService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMe', () => {
    it('should return user', async () => {
      const userData = UserMock.userData();
      const resDto = UserMock.toResponseDTO();
      const userEntity = UserMock.userEntity();

      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(userEntity);
      jest.spyOn(UsersMapper, 'toResponseDTO').mockReturnValue(resDto);

      const result = await service.getMe(userData);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        id: userData.userId,
      });
      expect(result).toEqual(resDto);
      expect(result.id).toBe(resDto.id);
    });
  });

  describe('getById', () => {
    it('should return user by id', async () => {
      const testId = UserMock.testId;
      const resDto = UserMock.toResponseDTO();
      const userEntity = UserMock.userEntity();

      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(userEntity);
      jest.spyOn(UsersMapper, 'toResponseDTO').mockReturnValue(resDto);

      const result = await service.getById(testId);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        id: testId,
      });
      expect(result).toEqual(resDto);
      expect(result.id).toBe(resDto.id);
    });

    it('should return not found exception', async () => {
      const testId = UserMock.testId;

      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.getById(testId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateMe', () => {
    it('should return updated user', async () => {
      const userData = UserMock.userData();
      const dto = UserMock.updateUserReqDto();
      const resDto = UserMock.toResponseDTO();
      const userBeforeUpdate = UserMock.userEntity();
      const userAfterUpdate = UserMock.userEntity(dto);

      jest
        .spyOn(mockUserRepository, 'findOneBy')
        .mockResolvedValue(userBeforeUpdate);
      jest.spyOn(mockUserRepository, 'save').mockResolvedValue(userAfterUpdate);
      jest.spyOn(UsersMapper, 'toResponseDTO').mockReturnValue(resDto);

      const result = await service.updateMe(userData, dto);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        id: userData.userId,
      });
      expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(resDto);
      expect(result.id).toBe(resDto.id);
      expect(result.email).toBe(resDto.email);
    });
  });

  // describe('removeMe', () => {
  //   it('should remove user', async () => {
  //     const userData = UserMock.userData();
  //     const userEntity = UserMock.userEntity();
  //
  //     jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(userEntity);
  //
  //     const res = await mockUserRepository.findOneBy({
  //       id: userData.userId as UserID,
  //     });
  //
  //     await service.removeMe(userData);
  //     await mockUserRepository.remove(res);
  //     expect(mockUserRepository.remove).toHaveBeenCalledWith({
  //       id: userData.userId,
  //     });
  //   });
  // });

  describe('sendEmail', () => {
    it('should send email to manager', async () => {
      const userData = UserMock.userData();
      const managerRes = ManagerMock.managerEntity();
      const user = UserMock.userEntity();
      const brand = UserMock.brand;
      const resDto = UserMock.toResponseDTO();

      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(user);
      jest
        .spyOn(mockManagerRepository, 'findOneBy')
        .mockResolvedValue(managerRes);
      jest.spyOn(mockEmailService, 'sendEmail').mockReturnValue(null);
      jest.spyOn(UsersMapper, 'toResponseDTO').mockReturnValue(resDto);

      const manager = await mockManagerRepository.findOneBy({
        role: UserRoleEnum.MANAGER,
      });
      const result = await service.getById(userData.userId as UserID);
      await mockEmailService.sendEmail(
        user.email,
        EmailTypeEnum.ADD_BRAND,
        {
          name: user.name,
          brand,
        },
        manager.email,
      );
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        id: userData.userId,
      });
      expect(mockEmailService.sendEmail).toHaveBeenCalledWith(
        user.email,
        EmailTypeEnum.ADD_BRAND,
        {
          name: user.name,
          brand,
        },
        manager.email,
      );
      expect(result).toEqual(resDto);
      expect(manager).toEqual(managerRes);
      expect(mockEmailService.sendEmail).toHaveBeenCalledTimes(1);
    });
  });

  describe('isEmailUniqueOrThrow', () => {
    it('should return conflict exception', async () => {
      const userData = UserMock.userData();
      const user = UserMock.userEntity();

      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(user);

      await expect(
        service.isEmailUniqueOrThrow(userData.email),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('buyPremiumAccount', () => {
    it('should change user account', async () => {
      const userData = UserMock.userData();
      const account = UserMock.updateAccountDto();
      const userBefore = UserMock.userEntity();
      const userAfter = UserMock.userEntity(account);

      jest.spyOn(mockUserRepository, 'findOneBy').mockResolvedValue(userBefore);

      const result = await mockUserRepository.findOneBy({
        id: userData.userId as UserID,
      });

      await mockUserRepository.update(result.id, {
        account: TypeUserAccountEnum.PREMIUM,
      });

      await expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        id: userData.userId as UserID,
      });
      await expect(mockUserRepository.update).toHaveBeenCalledWith(result.id, {
        account: TypeUserAccountEnum.PREMIUM,
      });
    });
  });
});
