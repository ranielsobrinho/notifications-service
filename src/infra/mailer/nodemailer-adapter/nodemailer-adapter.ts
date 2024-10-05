import * as nodemailer from 'nodemailer'
import { SendNewAccountEmail } from 'src/usecases/protocols/mailer/sendNewAccountEmail'

export class NodemailerAdapter implements SendNewAccountEmail {
  private readonly transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    tls: {
      ciphers: 'SSLv3'
    },
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  })

  async send(
    params: SendNewAccountEmail.Params
  ): Promise<SendNewAccountEmail.Result> {
    const { email, subject, text } = params
    this.transporter.sendMail(
      {
        from: process.env.SMTP_USER,
        to: email,
        subject,
        text
      },
      (error) => {
        if (error) {
          return console.log('Erro no nodemailer =>', error)
        }
        console.log('Email sent to: ', email)
      }
    )
  }
}
