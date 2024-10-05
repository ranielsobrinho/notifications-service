import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { SendNewAccountEmailNotificationUseCase } from './usecases/SendNewAccountEmailNotification'

@Controller()
export class NotificationController {
  constructor(
    private readonly sendNewAccountNotification: SendNewAccountEmailNotificationUseCase
  ) {}

  @MessagePattern('send-email-notification')
  async notifyNewAccount(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ): Promise<void> {
    await this.sendNewAccountNotification.sendEmail(data.message)
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    channel.ack(originalMsg)
  }
}
