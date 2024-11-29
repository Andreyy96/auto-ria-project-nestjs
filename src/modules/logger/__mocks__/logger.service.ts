import { MockServiceType } from '../../../../test/types/mock-service.type';
import { LoggerService } from '../logger.service';

export const mockLoggerService: MockServiceType<LoggerService> = {
  error: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
};
