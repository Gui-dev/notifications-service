import { Injectable } from '@nestjs/common'

import { NotificationsRepository } from '@app/repositories/notifications/notifications-repository'
import { NotificationNotFound } from './errors/notification-not-found'

interface IUnreadNotification {
  notificationId: string
}

type UnreadNotificationResponse = void

@Injectable()
export class UnreadNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) { }

  public async execute (
    { notificationId }: IUnreadNotification
  ): Promise<UnreadNotificationResponse> {
    const notification = await this.notificationsRepository.findById(notificationId)
    if (!notification) {
      throw new NotificationNotFound()
    }
    notification.unread()
    await this.notificationsRepository.save(notification)
  }
}
