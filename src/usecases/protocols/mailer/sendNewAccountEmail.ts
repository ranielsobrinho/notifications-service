import { EmailNotificationModel } from 'src/domain/models/email-notification-model'

export interface SendNewAccountEmail {
  send(params: SendNewAccountEmail.Params): Promise<SendNewAccountEmail.Result>
}

export namespace SendNewAccountEmail {
  export type Params = EmailNotificationModel
  export type Result = void
}
