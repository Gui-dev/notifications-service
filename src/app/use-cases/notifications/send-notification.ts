import { Injectable } from '@nestjs/common'
import { Content } from '@app/entities/notification/content'
import { Notification } from './../../entities/notification/notification'
import { NotificationsRepository } from './../../repositories/notifications/notifications-repository'

interface ISendNotification {
  recipientId: string
  category: string
  content: string
}

interface ISendNotificationResponse {
  notification: Notification
}

@Injectable()
export class SendNotification {
  constructor(
    private notificationsRepository: NotificationsRepository
  ) { }

  public async execute ({ recipientId, category, content }: ISendNotification):
    Promise<ISendNotificationResponse> {
    const notification = new Notification({
      recipientId,
      category,
      content: new Content(content)
    })

    await this.notificationsRepository.create(notification)

    return {
      notification
    }
  }
}
