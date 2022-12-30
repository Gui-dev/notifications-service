import { Notification as RawNotification } from '@prisma/client'
import { Notification } from '@app/entities/notification/notification'
import { Content } from '@app/entities/notification/content'

export class PrismaNotificationMapper {
  static toPrisma (notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      category: notification.category,
      content: notification.content.value,
      readAt: notification.readAt,
      createdAt: notification.createdAt
    }
  }

  static toDomain (raw: RawNotification): Notification {
    return new Notification({
      recipientId: raw.recipientId,
      category: raw.category,
      content: new Content(raw.content),
      readAt: raw.readAt,
      canceledAt: raw.canceledAt,
      createdAt: raw.createdAt
    }, raw.id)
  }
}
