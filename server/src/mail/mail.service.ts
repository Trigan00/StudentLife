import { Injectable } from '@nestjs/common';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    } as SMTPTransport.Options);
  }

  async sendMail({
    subject,
    text,
    to,
    html,
  }: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }) {
    // console.log(QRCodeUrl);
    try {
      await this.transporter.sendMail({
        from: 'StudentLife <mytest_90@mail.ru>',
        to,
        subject: subject,
        text: text,
        html: html,
      });
      console.log(`Mail send to ${to} successfully`);
    } catch (error) {
      console.log(error);
    }
  }
}
