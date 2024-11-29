import { PickType } from '@nestjs/swagger';

import { BaseAuthForPersonalReqDto, BaseAuthReqDto } from './base-auth.req.dto';

export class SignUpReqDto extends PickType(BaseAuthReqDto, [
  'email',
  'password',
  'phone',
  'name',
  'deviceId',
]) {}

export class SignUpForPersonalReqDto extends PickType(
  BaseAuthForPersonalReqDto,
  ['email', 'password', 'name', 'deviceId'],
) {}
