import { EmailTypeEnum } from '../enums/email-type.enum';

export const emailTemplateConstant = {
  [EmailTypeEnum.ADD_BRAND]: {
    templateName: 'add-brand',
    subject: 'Add new brand',
  },

  [EmailTypeEnum.NO_ACTIVE_CAR]: {
    templateName: 'no-active-car',
    subject: 'car no active',
  },
};
