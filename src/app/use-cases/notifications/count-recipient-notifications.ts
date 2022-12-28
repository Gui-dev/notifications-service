import { NotificationsRepository } from '@app/repositories/notifications/notifications-repository'
import { Injectable } from '@nestjs/common'

interface ICountRecipientNotifications {
  recipientId: string
}

interface ICountRecipientNotificationsResponse {
  count: number
}

@Injectable()
export class CountRecipientNotifications {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) { }

  public async execute (
    { recipientId }: ICountRecipientNotifications
  ): Promise<ICountRecipientNotificationsResponse> {
    const count = await this.notificationsRepository.countManyByRecipientId(recipientId)

    return {
      count
    }
  }
}
