import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { SendNotification } from '@app/use-cases/notifications/send-notification'

import { NotificationController } from './controllers/notifications/notification.controller'
import { CancelNotification } from '@app/use-cases/notifications/cancel-notification'
import { ReadNotification } from '@app/use-cases/notifications/read-notification'
import { UnreadNotification } from '@app/use-cases/notifications/unread-notification'
import { CountRecipientNotifications } from '@app/use-cases/notifications/count-recipient-notifications'
import { GetRecipientNotifications } from '@app/use-cases/notifications/get-recipient-notifications'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotifications,
    GetRecipientNotifications
  ]
})
export class HttpModule { }
