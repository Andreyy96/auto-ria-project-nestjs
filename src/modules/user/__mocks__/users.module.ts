import { Provider } from '@nestjs/common';

import { mockCarService } from '../../car/__mocks__/car.service';
import { CarService } from '../../car/services/car.service';
import { mockEmailService } from '../../email/__mocks__/email.service';
import { EmailService } from '../../email/email.service';
import { mockFileStorageService } from '../../file-storage/__mocks__/file.storage.service';
import { FileStorageService } from '../../file-storage/services/file.storage.service';
import { mockLoggerService } from '../../logger/__mocks__/logger.service';
import { LoggerService } from '../../logger/logger.service';
import { mockAccessTokenRepository } from '../../repository/__mocks__/access-token.repository';
import { mockCarRepository } from '../../repository/__mocks__/car.repository';
import { mockManagerRepository } from '../../repository/__mocks__/manager.repository';
import { mockRefreshTokenRepository } from '../../repository/__mocks__/refresh-token.repository';
import { mockUserRepository } from '../../repository/__mocks__/user.repository';
import { AccessTokenRepository } from '../../repository/services/access-token.repository';
import { CarRepository } from '../../repository/services/car.repository';
import { ManagerRepository } from '../../repository/services/manager.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
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
  {
    provide: CarService,
    useValue: mockCarService,
  },
  {
    provide: CarRepository,
    useValue: mockCarRepository,
  },
  {
    provide: AccessTokenRepository,
    useValue: mockAccessTokenRepository,
  },
  {
    provide: RefreshTokenRepository,
    useValue: mockRefreshTokenRepository,
  },
];
