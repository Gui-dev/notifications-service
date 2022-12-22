import { Content } from './content'

describe('Content class', () => {
  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('AAA')).toThrow()
  })

  it('should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma nova notificação')
    expect(content).toBeTruthy()
  })
})
