import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiFile } from '../../common/decorators/api-file.decorator';
import { CarID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { CarListReqDto } from './models/dto/req/car-list.req.dto';
import { CreateCarReqDto } from './models/dto/req/create-car.req.dto';
import { CarResDto } from './models/dto/res/car.res.dto';
import { CarListResDto } from './models/dto/res/car-list.res.dto';
import { StatisticCarResDto } from './models/dto/res/statistic-car.res.dto';
import { CarService } from './services/car.service';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @SkipAuth()
  @Get('')
  public async getList(@Query() query: CarListReqDto): Promise<CarListResDto> {
    return await this.carService.getList(query);
  }

  @ApiBearerAuth()
  @Post('')
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    return await this.carService.create(userData, dto);
  }

  @ApiBearerAuth()
  @Get('no-active')
  public async getNoActiveList(
    @CurrentUser() userData: IUserData,
    @Query() query: CarListReqDto,
  ): Promise<CarListResDto> {
    return await this.carService.getNoActiveList(userData, query);
  }

  @SkipAuth()
  @Get(':carId')
  public async getById(
    @Param('carId', ParseUUIDPipe) carId: CarID,
  ): Promise<CarResDto> {
    return await this.carService.getById(carId);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':carId')
  public async deleteById(
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: CarID,
  ): Promise<void> {
    await this.carService.deleteById(userData, carId);
  }

  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiFile('image', false, true)
  @Post(':carId/image')
  public async uploadImage(
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: CarID,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.carService.uploadImage(userData, image, carId);
  }

  @ApiBearerAuth()
  @Delete(':carId/image')
  public async deleteImage(
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: CarID,
  ): Promise<void> {
    await this.carService.deleteImage(userData, carId);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':carId/sell')
  public async sellById(
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: CarID,
  ): Promise<void> {
    await this.carService.sellById(userData, carId);
  }

  @ApiBearerAuth()
  @Get(':carId/statistic')
  public async getStatistic(
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: CarID,
  ): Promise<StatisticCarResDto> {
    return await this.carService.getStatistic(userData, carId);
  }
}
