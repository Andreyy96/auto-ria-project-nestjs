import { MockServiceType } from '../../../../test/types/mock-service.type';
import { FileStorageService } from '../services/file.storage.service';

export const mockFileStorageService: MockServiceType<FileStorageService> = {
  deleteFile: jest.fn(),
  uploadFile: jest.fn(),
};
