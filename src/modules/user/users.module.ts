import { Module } from '@nestjs/common';

import { CarModule } from '../car/car.module';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [FileStorageModule, CarModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
