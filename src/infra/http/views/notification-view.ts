import { Notification } from '@app/entities/notification/notification'

export class NotificationView {
  static toHTTP (notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      category: notification.category,
      content: notification.content.value
    }
  }
}
