import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma.service'
import { Notification } from '@app/entities/notification/notification'
import { NotificationsRepository } from '@app/repositories/notifications/notifications-repository'
import { PrismaNotificationMapper } from '../../mappers/prisma-notification-mapper'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  public async findById (notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId
      }
    })
    if (!notification) {
      return null
    }

    return PrismaNotificationMapper.toDomain(notification)
  }

  public async findManyByRecipientId (recipientId: string): Promise<Notification[]> {
    throw new Error('Method not implemented.')
  }

  public async countManyByRecipientId (recipientId: string): Promise<number> {
    throw new Error('Method not implemented.')
  }

  public async create (notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    await this.prisma.notification.create({
      data: raw
    })
  }

  public async save (notification: Notification): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
