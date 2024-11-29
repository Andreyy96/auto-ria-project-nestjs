import { EmailTypeEnum } from '../enums/email-type.enum';
import { EmailCombinedPayloadType } from './email-combined-payload.type';
import { PickRequired } from './pick-required.type';

export type EmailTypeToPayloadType = {
  [EmailTypeEnum.ADD_BRAND]: PickRequired<
    EmailCombinedPayloadType,
    'name' | 'brand'
  >;

  [EmailTypeEnum.NO_ACTIVE_CAR]: PickRequired<
    EmailCombinedPayloadType,
    'car_id'
  >;
};
