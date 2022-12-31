import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'

import { CreateNotificationBody } from '../../dtos/create-notification-body'
import { SendNotification } from '@app/use-cases/notifications/send-notification'
import { NotificationView } from '@infra/http/views/notification-view'
import { CancelNotification } from '@app/use-cases/notifications/cancel-notification'
import { ReadNotification } from '@app/use-cases/notifications/read-notification'
import { UnreadNotification } from '@app/use-cases/notifications/unread-notification'
import { CountRecipientNotifications } from '@app/use-cases/notifications/count-recipient-notifications'
import { GetRecipientNotifications } from '@app/use-cases/notifications/get-recipient-notifications'

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly countRecipientNotifications: CountRecipientNotifications,
    private readonly getRecipientNotifications: GetRecipientNotifications
  ) { }

  @Get('count/from/:recipientId')
  public async countFromRecipient (@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId
    })

    return { count }
  }

  @Get('from/:recipientId')
  public async getFromRecipient (@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId
    })
    return {
      notifications: notifications.map(NotificationView.toHTTP)
    }
  }

  @Patch(':id/read')
  public async read (@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    })
  }

  @Patch(':id/unread')
  public async unread (@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    })
  }

  @Post()
  public async create (@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body
    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content
    })

    return {
      notification: NotificationView.toHTTP(notification)
    }
  }

  @Patch(':id/cancel')
  public async cancel (@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id })
  }
}
