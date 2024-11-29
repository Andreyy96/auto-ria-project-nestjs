import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ApiFile } from '../../common/decorators/api-file.decorator';
import { UserID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { BrandReqDto } from './dto/req/brand.req.dto';
import { ManagerResDto } from './dto/res/manager.res.dto';
import { ManagerService } from './services/manager.service';

@ApiTags('Managers')
@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @ApiBearerAuth()
  @Get('me')
  public async getMe(
    @CurrentUser() userData: IUserData,
  ): Promise<ManagerResDto> {
    return await this.managerService.getMe(userData);
  }

  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiFile('avatar', false, true)
  @Post('me/avatar')
  public async uploadAvatar(
    @CurrentUser() userData: IUserData,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<void> {
    await this.managerService.uploadAvatar(userData, avatar);
  }

  @ApiBearerAuth()
  @Delete('me/avatar')
  public async deleteAvatar(@CurrentUser() userData: IUserData): Promise<void> {
    await this.managerService.deleteAvatar(userData);
  }

  @ApiBearerAuth()
  @Patch('banned/:userId')
  public async bannedUser(
    @CurrentUser() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<void> {
    await this.managerService.bannedUser(userData, userId);
  }

  @ApiBearerAuth()
  @Patch('unbanned/:userId')
  public async unbannedUser(
    @CurrentUser() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<void> {
    await this.managerService.unbannedUser(userData, userId);
  }

  @ApiBearerAuth()
  @Post('brand')
  public async putBrandInList(
    @CurrentUser() userData: IUserData,
    @Body() dto: BrandReqDto,
  ): Promise<void> {
    await this.managerService.putBrandInList(userData, dto.brand);
  }
}
