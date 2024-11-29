import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { AdminPermissionGuard } from './guards/admin-permission.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { SignInReqDto } from './models/dto/req/sign-in.req.dto';
import {
  SignUpForPersonalReqDto,
  SignUpReqDto,
} from './models/dto/req/sign-up.req.dto';
import {
  AuthAdminResDto,
  AuthManagerResDto,
  AuthResDto,
} from './models/dto/res/auth.res.dto';
import { TokenPairResDto } from './models/dto/res/token-pair.res.dto';
import { IUserData } from './models/interfaces/user-data.interface';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.authService.signUp(dto);
  }

  @SkipAuth()
  @Post('sign-up/admin')
  public async signUpAdmin(
    @Body() dto: SignUpForPersonalReqDto,
  ): Promise<AuthAdminResDto> {
    return await this.authService.signUpAdmin(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Admin permission' })
  @UseGuards(AdminPermissionGuard)
  @SkipAuth()
  @Post('sign-up/manager')
  public async signUpManager(
    @Body() dto: SignUpForPersonalReqDto,
  ): Promise<AuthManagerResDto> {
    return await this.authService.signUpManager(dto);
  }

  @SkipAuth()
  @Post('sign-in')
  public async signIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.signIn(dto);
  }

  @SkipAuth()
  @Post('sign-in/admin')
  public async signInAdmin(
    @Body() dto: SignInReqDto,
  ): Promise<AuthAdminResDto> {
    return await this.authService.signInAdmin(dto);
  }

  @SkipAuth()
  @Post('sign-in/manager')
  public async signInManager(
    @Body() dto: SignInReqDto,
  ): Promise<AuthManagerResDto> {
    return await this.authService.signInManager(dto);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Refresh token pair' })
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sign out' })
  @Post('sign-out')
  public async signOut(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.authService.signOut(userData);
  }
}
