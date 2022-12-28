import { Notification } from '@app/entities/notification/notification'
import { NotificationsRepository } from '@app/repositories/notifications/notifications-repository'
import { Injectable } from '@nestjs/common'

interface IGetRecipientNotifications {
  recipientId: string
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[]
}

@Injectable()
export class GetRecipientNotifications {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) { }

  public async execute (
    { recipientId }: IGetRecipientNotifications
  ): Promise<GetRecipientNotificationsResponse> {
    const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId)

    return {
      notifications
    }
  }
}
