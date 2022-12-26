import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma.service'
import { Notification } from '@app/entities/notification/notification'
import { NotificationsRepository } from '@app/repositories/notifications/notifications-repository'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  public async create (notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: {
        id: notification.id,
        recipientId: notification.recipientId,
        category: notification.category,
        content: notification.content.value,
        readAt: notification.readAt,
        createdAt: notification.createdAt
      }
    })
  }

}
