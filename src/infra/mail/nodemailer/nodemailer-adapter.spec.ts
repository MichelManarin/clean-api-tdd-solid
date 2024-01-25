import nodemailer from 'nodemailer'
import { NodemailerAdapter } from './nodemailer-adapter'

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'any_string' })
  })
}))

const host = 'any_host'
const user = 'any_user'
const pass = 'any_pass'
const secure = true
const port = 0

const makeSut = (): NodemailerAdapter => {
  return new NodemailerAdapter(host, port, secure, user, pass)
}

describe('nodemailer', () => {
  test('Should call createTransport with correct values', async () => {
    const sut = makeSut()
    const createTransportSpy = jest.spyOn(nodemailer, 'createTransport')
    await sut.sendMail('any_from', 'any_to', 'any_subject', 'any_text', 'any_html')
    expect(createTransportSpy).toHaveBeenCalledWith({
      host: 'any_host',
      port: 0,
      secure: true,
      auth: {
        user: 'any_user',
        pass: 'any_pass'
      }
    })
  })

  test('Should call sendMail with correct values', async () => {
    const sut = makeSut()
    const response = await sut.sendMail('any_from', 'any_to', 'any_subject', 'any_text', 'any_html')
    expect(response).toEqual('any_string')
  })
})
