import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from 'joi'
import { NotificationController } from './notification.controller'
import { SendNewAccountEmailNotificationUseCase } from './usecases/SendNewAccountEmailNotification'
import { NodemailerAdapter } from './infra/mailer/nodemailer-adapter/nodemailer-adapter'
import { SendNewAccountEmail } from './usecases/protocols/mailer/sendNewAccountEmail'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SMTP_USER: Joi.string().required(),
        GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_OAUTH_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_OAUTH_REFRESH_TOKEN: Joi.string().required()
      })
    }),
    NodemailerAdapter
  ],
  controllers: [NotificationController],
  providers: [
    {
      provide: NodemailerAdapter,
      useFactory: () => {
        return new NodemailerAdapter()
      }
    },
    {
      provide: SendNewAccountEmailNotificationUseCase,
      useFactory: (nodemailerAdapter: SendNewAccountEmail) => {
        return new SendNewAccountEmailNotificationUseCase(nodemailerAdapter)
      },
      inject: [NodemailerAdapter]
    }
  ]
})
export class NotificationModule {}
