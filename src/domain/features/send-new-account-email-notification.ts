import { EmailNotificationModel } from '../models/email-notification-model'

export interface SendNewAccountEmailNotification {
  sendEmail(
    params: SendNewAccountEmailNotification.Params
  ): Promise<SendNewAccountEmailNotification.Result>
}

export namespace SendNewAccountEmailNotification {
  export type Params = EmailNotificationModel
  export type Result = void
}
