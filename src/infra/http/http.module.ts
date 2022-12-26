import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { SendNotification } from '@app/use-cases/notifications/send-notification'

import { NotificationController } from './controllers/notifications/notification.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [SendNotification]
})
export class HttpModule { }
