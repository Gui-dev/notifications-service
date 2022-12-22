import { Module } from '@nestjs/common'

import { NotificationController } from './notifications/notification.controller'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [PrismaService],
})
export class AppModule { }
