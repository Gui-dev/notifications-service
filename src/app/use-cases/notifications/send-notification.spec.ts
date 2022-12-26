import { InMemoryNotificationsRepository } from '@test/repositories/notification/in-memory-notifications-repository'
import { SendNotification } from './send-notification'


describe('Send Notification', () => {
  it('should be able to create a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const sendNotification = new SendNotification(notificationsRepository)
    const { notification } = await sendNotification.execute({
      recipientId: 'example-recipient-id',
      category: 'social',
      content: 'Nova solicitação de amizade'
    })
    expect(notificationsRepository.notifications).toHaveLength(1)
    expect(notificationsRepository.notifications[0]).toEqual(notification)
  })
})
