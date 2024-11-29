import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { emailTemplateConstant } from './constants/email.constant';
import { EmailTypeEnum } from './enums/email-type.enum';
import { EmailTypeToPayloadType } from './types/email-type-to-payload.type';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendEmail<T extends EmailTypeEnum>(
    from: string,
    type: T,
    dynamicTemplateData: EmailTypeToPayloadType[T],
    managerEmail: string,
  ): Promise<void> {
    const { subject, templateName } = emailTemplateConstant[type];

    const path = `${__dirname.split('dist')[0]}/src/modules/email/templates`;

    await this.mailerService.sendMail({
      to: managerEmail,
      from,
      subject,
      template: `${path}/${templateName}`,
      context: dynamicTemplateData,
    });
  }
}
