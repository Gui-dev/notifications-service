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

  public async create (notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    await this.prisma.notification.create({
      data: raw
    })
  }

}
