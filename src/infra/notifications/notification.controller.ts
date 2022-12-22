import { randomUUID } from 'node:crypto'
import { Body, Controller, Get, Post } from '@nestjs/common'

import { PrismaService } from './../prisma/prisma.service'
import { CreateNotificationBody } from './create-notification-body'

@Controller('notifications')
export class NotificationController {
  constructor(private readonly prisma: PrismaService) { }

  @Get()
  public async list () {
    return await this.prisma.notification.findMany()
  }

  @Post()
  public async create (@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body
    const notification = await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        category,
        content,
        recipientId
      }
    })

    return notification
  }

}
