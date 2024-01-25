export interface SendMail {
  sendMail (from: string, to: string, subject: string, text: string, html: string): Promise<string>
}
