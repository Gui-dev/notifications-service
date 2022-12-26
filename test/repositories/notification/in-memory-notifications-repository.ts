import { Notification } from '@app/entities/notification/notification'
import { NotificationsRepository } from '@app/repositories/notifications/notifications-repository'

export class InMemoryNotificationsRepository implements NotificationsRepository {
  public notifications: Notification[] = []

  public async create (notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }

}
