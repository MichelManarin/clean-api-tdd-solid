export interface SendMail {
  sendMail (mail: SendMailModel): Promise<string>
}

export interface SendMailModel {
  from: string
  to: string
  subject: string
  text: string
  html: string
}
