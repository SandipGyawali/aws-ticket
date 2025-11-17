import { Injectable } from '@nestjs/common';
import * as QRCode from "qrcode"
import { Attendee } from 'src/attendees/entities/attendee.entity';

@Injectable()
export class TicketService {
  generateTickerQR(attendee: Attendee) {
    const payload = {
      id: attendee.id,
      email: attendee.email,
      full_name: attendee.full_name
    }
    return QRCode.toBuffer(JSON.stringify(payload), { type: 'png' })
  }
}
