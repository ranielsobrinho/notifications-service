import { SendNewAccountEmailNotification } from 'src/domain/features/send-new-account-email-notification'
import { SendNewAccountEmail } from './protocols/mailer/sendNewAccountEmail'

export class SendNewAccountEmailNotificationUseCase
  implements SendNewAccountEmailNotification
{
  constructor(private readonly sendNewAccountEmail: SendNewAccountEmail) {}
  async sendEmail(
    params: SendNewAccountEmailNotification.Params
  ): Promise<SendNewAccountEmailNotification.Result> {
    await this.sendNewAccountEmail.send(params)
  }
}
