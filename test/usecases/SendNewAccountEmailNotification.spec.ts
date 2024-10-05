import { SendNewAccountEmailNotificationUseCase } from '../../src/usecases/SendNewAccountEmailNotification'
import { SendNewAccountEmail } from '../../src/usecases/protocols/mailer/sendNewAccountEmail'

const makeSendEmailRequest: SendNewAccountEmail.Params = {
  email: 'any_email@mail.com',
  subject: 'any_subject',
  text: 'any_text'
}

const makeSendAccountEmailStub = (): SendNewAccountEmail => {
  class SendNewAccountEmailStub implements SendNewAccountEmail {
    async send(): Promise<void> {
      return
    }
  }
  return new SendNewAccountEmailStub()
}
type SutTypes = {
  sut: SendNewAccountEmailNotificationUseCase
  sendNewAccountEmailStub: SendNewAccountEmail
}

const makeSut = (): SutTypes => {
  const sendNewAccountEmailStub = makeSendAccountEmailStub()
  const sut = new SendNewAccountEmailNotificationUseCase(
    sendNewAccountEmailStub
  )
  return {
    sut,
    sendNewAccountEmailStub
  }
}

describe('SendNewAccountEmailNotificationUseCase', () => {
  test('Ensure SendNewAccountEmailNotificationUseCase calls SendNewAccountEmail with correct params', async () => {
    const { sut, sendNewAccountEmailStub } = makeSut()
    const sendEmailSpy = jest.spyOn(sendNewAccountEmailStub, 'send')
    await sut.sendEmail(makeSendEmailRequest)
    expect(sendEmailSpy).toHaveBeenCalledWith(makeSendEmailRequest)
    expect(sendEmailSpy).toHaveBeenCalledTimes(1)
  })
})
