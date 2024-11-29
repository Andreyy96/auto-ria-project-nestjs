import { MockServiceType } from '../../../../test/types/mock-service.type';
import { UsersService } from '../services/users.service';

export const mockUsersService: MockServiceType<UsersService> = {
  buyPremiumAccount: jest.fn(),
  removeMe: jest.fn(),
  sendEmail: jest.fn(),
  getMe: jest.fn(),
  updateMe: jest.fn(),
  getById: jest.fn(),
  isEmailUniqueOrThrow: jest.fn(),
  uploadAvatar: jest.fn(),
  deleteAvatar: jest.fn(),
};
