import { Test } from '@nestjs/testing';

import { UserMock } from '../../../test/__mocks__/user.mock';
import { mockUsersProviders } from './__mocks__/users.module';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

describe(UsersController.name, () => {
  let controller: UsersController;
  let mockService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [...mockUsersProviders],
    }).compile();
    controller = module.get<UsersController>(UsersController);
    mockService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMe', () => {
    it('should return user', async () => {
      const userData = UserMock.userData();
      const resDto = UserMock.toResponseDTO();

      jest.spyOn(mockService, 'getMe').mockResolvedValue(resDto);

      const result = await controller.getMe(userData);
      expect(mockService.getMe).toHaveBeenCalledWith(userData);
      expect(result).toEqual(resDto);
    });
  });

  describe('update', () => {
    it('should update User', async () => {
      const userData = UserMock.userData();
      const resDto = UserMock.toUpdateResponseDTO();
      const updateUserDto = UserMock.updateUserReqDto();

      jest.spyOn(mockService, 'updateMe').mockResolvedValue(resDto);

      const result = await controller.update(userData, updateUserDto);
      expect(mockService.updateMe).toHaveBeenCalledWith(
        userData,
        updateUserDto,
      );
      expect(result).toEqual(resDto);
    });
  });

  describe('remove', () => {
    it('should remove User', async () => {
      const userData = UserMock.userData();

      jest.spyOn(mockService, 'removeMe').mockResolvedValue();

      await controller.remove(userData);
      expect(mockService.removeMe).toHaveBeenCalledWith(userData);
    });
  });

  describe('uploadAvatar', () => {
    it('should upload user avatar', async () => {
      const userData = UserMock.userData();
      const file = UserMock.avatarData();

      jest.spyOn(mockService, 'uploadAvatar').mockResolvedValue();

      await controller.uploadAvatar(userData, file);
      expect(mockService.uploadAvatar).toHaveBeenCalledWith(userData, file);
    });
  });

  describe('deleteAvatar', () => {
    it('should remove user avatar', async () => {
      const userData = UserMock.userData();

      jest.spyOn(mockService, 'deleteAvatar').mockResolvedValue();

      await controller.deleteAvatar(userData);
      expect(mockService.deleteAvatar).toHaveBeenCalledWith(userData);
    });
  });

  describe('buyPremiumAccount', () => {
    it('should change user account on Premium', async () => {
      const userData = UserMock.userData();

      jest.spyOn(mockService, 'buyPremiumAccount').mockResolvedValue();

      await controller.buyPremiumAccount(userData);
      expect(mockService.buyPremiumAccount).toHaveBeenCalledWith(userData);
    });
  });

  describe('sendEmail', () => {
    it('should send email to manager', async () => {
      const dto = UserMock.dtoBrand();
      const userData = UserMock.userData();

      await controller.sendEmail(userData, dto);
      expect(mockService.sendEmail).toHaveBeenCalledWith(userData, dto.brand);
    });
  });

  describe('getById', () => {
    it('should get user by id', async () => {
      const testId = UserMock.testId;
      const resDto = UserMock.toResponseDTO();

      jest.spyOn(mockService, 'getById').mockResolvedValue(resDto);

      const result = await controller.getById(testId);
      expect(mockService.getById).toHaveBeenCalledWith(testId);
      expect(result).toEqual(resDto);
    });
  });
});
