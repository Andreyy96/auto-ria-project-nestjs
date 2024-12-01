import { MockServiceType } from '../../../../test/types/mock-service.type';
import { CarService } from '../services/car.service';

export const mockCarService: MockServiceType<CarService> = {
  create: jest.fn(),
  deleteById: jest.fn(),
  getById: jest.fn(),
  getList: jest.fn(),
  deleteImage: jest.fn(),
  getNoActiveList: jest.fn(),
  sellById: jest.fn(),
  uploadImage: jest.fn(),
  getStatistic: jest.fn(),
};
