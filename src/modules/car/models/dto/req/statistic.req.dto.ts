import { PickType } from '@nestjs/swagger';

import { BaseCarReqDto } from './base-car.req.dto';

export class StatisticAvgPriceByRegionReqDto extends PickType(BaseCarReqDto, [
  'model',
  'region',
]) {}

export class StatisticAvgPriceReqDto extends PickType(BaseCarReqDto, [
  'model',
]) {}
