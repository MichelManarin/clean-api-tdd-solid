import nodemailer from 'nodemailer'
import { SendMail } from '../../../data/protocols/mail/send-mail'

export class NodemailerAdapter implements SendMail {
  constructor (
    private readonly host: string,
    private readonly port: number,
    private readonly secure: boolean,
    private readonly user: string,
    private readonly pass: string
  ) { }

  async sendMail (from: string, to: string, subject: string, text: string, html: string): Promise<string> {
    const transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: this.secure,
      auth: {
        user: this.user,
        pass: this.pass
      }
    })
    const info = await transporter.sendMail({ from, to, subject, text, html })
    return info.messageId
  }
}
