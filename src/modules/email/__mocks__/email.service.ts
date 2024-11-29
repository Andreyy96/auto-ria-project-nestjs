import { MockServiceType } from '../../../../test/types/mock-service.type';
import { EmailService } from '../email.service';

export const mockEmailService: MockServiceType<EmailService> = {
  sendEmail: jest.fn(),
};
