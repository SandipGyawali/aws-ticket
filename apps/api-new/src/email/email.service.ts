import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from "nodemailer"
import { Attendee } from 'src/attendees/entities/attendee.entity';
import { generateTicketEmailHtml } from './email.template';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport(this.getGoogleConfig());
  }
  async sendTicketMail(attendee: Attendee, ticketQrBuffer: Buffer) {
    const cid = 'ticket_qr_' + Math.random().toString(36).substring(7);

    const htmlContent = generateTicketEmailHtml(attendee, cid);

    await this.transporter.sendMail({
      to: attendee.email,
      subject: 'Ticket for AWS SCD Nepal 2025',
      html: htmlContent,
      attachments: [
        {
          filename: 'ticket-qr.png',
          content: ticketQrBuffer,
          contentType: 'image/png',
          cid: cid, // Referenced in the HTML as 'cid:cid'
        },
      ],

    });
  }

  private getGoogleConfig() {
    return {
      service: "gmail",
      auth: {
        user: "pqrsandesh@gmail.com",
        pass: this.configService.get('GOOGLE_APP_PASSWORD')
      },
    }
  }


}

