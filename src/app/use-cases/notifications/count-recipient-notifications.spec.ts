import { Content } from '@app/entities/notification/content'
import { Notification } from '@app/entities/notification/notification'
import { InMemoryNotificationsRepository } from '@test/repositories/notification/in-memory-notifications-repository'
import { CountRecipientNotifications } from './count-recipient-notifications'


describe('Count Recipients Notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository)
    await notificationsRepository.create(new Notification({
      recipientId: 'recipient-1',
      category: 'social',
      content: new Content('Nova solicitação de amizade')
    }))

    await notificationsRepository.create(new Notification({
      recipientId: 'recipient-1',
      category: 'social',
      content: new Content('Nova solicitação de amizade')
    }))

    await notificationsRepository.create(new Notification({
      recipientId: 'recipient-2',
      category: 'social',
      content: new Content('Nova solicitação de amizade')
    }))

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1'
    })
    expect(count).toEqual(2)
  })
})
