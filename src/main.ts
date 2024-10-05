import { NestFactory } from '@nestjs/core'
import { NotificationModule } from './notification.module'
import { Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule)
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:bitnami@localhost:5672'],
      queue: 'notifications',
      noAck: false
    }
  })
  await app.startAllMicroservices()
}
bootstrap()
