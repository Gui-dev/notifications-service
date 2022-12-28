import { INotification, Notification } from '@app/entities/notification/notification'
import { Content } from '@app/entities/notification/content'

type Override = Partial<INotification>

export const makeNotification = (override: Override = {}) => {
  return new Notification({
    recipientId: 'recipient-1',
    category: 'social',
    content: new Content('Nova solicitação de amizade'),
    ...override
  })
}
