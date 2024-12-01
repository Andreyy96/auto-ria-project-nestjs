import { MockServiceType } from '../../../../test/types/mock-service.type';
import { HighActionService } from '../high-action.service';

export const mockHighActionService: MockServiceType<HighActionService> = {
  addBrand: jest.fn(),
  bannedUser: jest.fn(),
  unbannedUser: jest.fn(),
  activateCarById: jest.fn(),
  deleteCarById: jest.fn(),
  disableCarById: jest.fn(),
};
