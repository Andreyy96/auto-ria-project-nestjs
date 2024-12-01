import { CarID, UserID } from '../../src/common/types/entity-ids.type';
import { CarEntity } from '../../src/database/entities/car.entity';

export class CarMock {
  static CarsList(properties?: Partial<CarEntity>): CarEntity[] {
    return [
      {
        image: null,
        base_ccy: 'UAH',
        user_ccy: '100000',
        isActive: false,
        user_price: '10000',
        view: '0',
        rate: null,
        user_id: 'testId' as UserID,
        price: '10000',
        model: 'BMV',
        id: 'testId' as CarID,
        region: 'string',
        brand: 'x6',
        created: new Date('2021-01-01'),
        updated: new Date('2021-01-01'),
        ...(properties || {}),
      },
      {
        image: null,
        base_ccy: 'UAH',
        user_ccy: '100000',
        isActive: false,
        user_price: '10000',
        view: '0',
        rate: null,
        user_id: 'testId' as UserID,
        price: '10000',
        model: 'BMV',
        id: 'testId' as CarID,
        region: 'string',
        brand: 'x7',
        created: new Date('2021-01-01'),
        updated: new Date('2021-01-01'),
        ...(properties || {}),
      },
    ];
  }
}
