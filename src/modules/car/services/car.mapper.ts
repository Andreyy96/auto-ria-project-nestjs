import * as process from 'node:process';

import { CarEntity } from '../../../database/entities/car.entity';
import { UsersMapper } from '../../user/services/users.mapper';
import { CarListReqDto } from '../models/dto/req/car-list.req.dto';
import { CarResDto } from '../models/dto/res/car.res.dto';
import { CarListResDto } from '../models/dto/res/car-list.res.dto';
import { StatisticCarResDto } from '../models/dto/res/statistic-car.res.dto';

export class CarMapper {
  public static toResponseDTO(car: CarEntity): CarResDto {
    return {
      id: car.id,
      brand: car.brand,
      model: car.model,
      region: car.region,
      user_ccy: car.user_ccy,
      user_price: car.user_price,
      price: car.price,
      base_ccy: car.base_ccy,
      rate: car.rate ? car.rate : null,
      isActive: car.isActive,
      image: car.image ? `${process.env.AWS_S3_BUCKET_URL}/${car.image}` : null,
      user: car.user ? UsersMapper.toResponseDTO(car.user) : null,
    };
  }

  public static toResponseCreateDTO(car: CarEntity): CarResDto {
    return {
      id: car.id,
      brand: car.brand,
      model: car.model,
      region: car.region,
      user_ccy: car.user_ccy,
      user_price: car.user_price,
      price: car.price,
      base_ccy: car.base_ccy,
      rate: car.rate ? car.rate : null,
      isActive: car.isActive,
      image: car.image ? `${process.env.AWS_S3_BUCKET_URL}/${car.image}` : null,
    };
  }

  public static toListResponseDTO(
    entities: CarEntity[],
    total: number,
    query: CarListReqDto,
  ): CarListResDto {
    return {
      data: entities.map(this.toResponseDTO),
      meta: {
        total,
        limit: query.limit,
        offset: query.offset,
      },
    };
  }

  public static toResponseStatistic(
    avgPrice: number,
    avgPriceByRegion: number,
    views: number,
    viewsForWeek: number,
    viewsForMonth: number,
    viewsForYear: number,
  ): StatisticCarResDto {
    return {
      avgPrice: avgPrice,
      avgPriceByRegion: avgPriceByRegion,
      views: views,
      viewsForWeek: viewsForWeek,
      viewsForMonth: viewsForMonth,
      viewsForYear: viewsForYear,
    };
  }
}
