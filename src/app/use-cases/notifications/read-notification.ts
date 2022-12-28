import { NotificationsRepository } from '@app/repositories/notifications/notifications-repository'
import { Injectable } from '@nestjs/common'
import { NotificationNotFound } from './errors/notification-not-found'

interface IReadNotification {
  notificationId: string
}

type ReadNotificationResponse = void

@Injectable()
export class ReadNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) { }
  public async execute (
    { notificationId }: IReadNotification
  ): Promise<ReadNotificationResponse> {
    const notification = await this.notificationsRepository.findById(notificationId)
    if (!notification) {
      throw new NotificationNotFound()
    }
    notification.read()
    await this.notificationsRepository.save(notification)
  }
}
