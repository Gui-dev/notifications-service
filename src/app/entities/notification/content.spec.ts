import { Content } from './content'

describe('Content class', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma nova notificação')
    expect(content).toBeTruthy()
  })
})
