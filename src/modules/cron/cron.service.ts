import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { PRIVATE_BANK_URL } from '../../common/constants/private-bank-info.constant';
import { IResPrivateBunk } from '../car/models/interfaces/res-private_bunk.interface';
import { LoggerService } from '../logger/logger.service';
import { CarRepository } from '../repository/services/car.repository';

@Injectable()
export class CronService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly httpService: HttpService,
    private readonly carRepository: CarRepository,
  ) {}
  @Cron('* * 4 * * *')
  async handleCron() {
    this.loggerService.log('update rate and price cars');
    const { data } =
      await this.httpService.axiosRef.get<IResPrivateBunk[]>(PRIVATE_BANK_URL);

    const cars = await this.carRepository.getCarsNotUAH();

    let price: number;
    let rate: string;
    for (const car of cars) {
      const bankRate = data.find((element) => element.ccy === car.user_ccy);

      if (bankRate) {
        price = Math.round(+car.user_price * bankRate.sale);
        rate = bankRate.sale.toString();
        await this.carRepository.save({
          ...car,
          price: price.toString(),
          rate,
        });
      }
    }
  }
}
