import { Injectable } from '@nestjs/common'

import { NotificationsRepository } from '@app/repositories/notifications/notifications-repository'
import { NotificationNotFound } from './errors/notification-not-found'

interface ICancelNotification {
  notificationId: string
}

type ICancelNotificationResponse = void

@Injectable()
export class CancelNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) { }

  public async execute ({ notificationId }: ICancelNotification): Promise<ICancelNotificationResponse> {
    const notification = await this.notificationsRepository.findById(notificationId)
    if (!notification) {
      throw new NotificationNotFound()
    }
    notification.cancel()
    await this.notificationsRepository.save(notification)
  }
}
