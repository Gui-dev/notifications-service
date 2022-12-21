import { randomUUID } from 'node:crypto'
import { Controller, Get, Post } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'


@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) { }

  @Get()
  public async list () {
    return await this.prisma.notification.findMany()
  }

  @Post()
  public async create () {
    const notification = await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        category: 'social',
        content: 'Você tem uma nova solitação de amizade',
        recipientId: randomUUID()
      }
    })

    return notification
  }

}
