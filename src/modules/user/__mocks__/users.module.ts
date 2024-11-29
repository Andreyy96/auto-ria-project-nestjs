import { Provider } from '@nestjs/common';

import { mockEmailService } from '../../email/__mocks__/email.service';
import { EmailService } from '../../email/email.service';
import { mockFileStorageService } from '../../file-storage/__mocks__/file.storage.service';
import { FileStorageService } from '../../file-storage/services/file.storage.service';
import { mockLoggerService } from '../../logger/__mocks__/logger.service';
import { LoggerService } from '../../logger/logger.service';
import { mockManagerRepository } from '../../repository/__mocks__/manager.repository';
import { mockUserRepository } from '../../repository/__mocks__/user.repository';
import { ManagerRepository } from '../../repository/services/manager.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UsersService } from '../services/users.service';
import { mockUsersService } from './users.service';

export const mockUsersProviders: Provider[] = [
  {
    provide: LoggerService,
    useValue: mockLoggerService,
  },
  {
    provide: UserRepository,
    useValue: mockUserRepository,
  },

  {
    provide: FileStorageService,
    useValue: mockFileStorageService,
  },
  {
    provide: UsersService,
    useValue: mockUsersService,
  },
  {
    provide: EmailService,
    useValue: mockEmailService,
  },
  {
    provide: ManagerRepository,
    useValue: mockManagerRepository,
  },
];
