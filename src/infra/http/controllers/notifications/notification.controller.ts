import { Body, Controller, Post } from '@nestjs/common'

import { CreateNotificationBody } from '../../dtos/create-notification-body'
import { SendNotification } from '@app/use-cases/notifications/send-notification'

@Controller('notifications')
export class NotificationController {
  constructor(private readonly sendNotification: SendNotification) { }

  @Post()
  public async create (@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body
    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content
    })

    return notification
  }

}
