// email.service.ts or 'src/email/email.templates.ts'

import { Attendee } from 'src/attendees/entities/attendee.entity';

/**
 * Generates the HTML template for the event ticket email with screenshot instructions.
 * @param attendee The attendee object to personalize the email.
 * @param qrCodeCid The Content ID (CID) used to reference the embedded QR code image.
 * @returns The complete HTML string for the email body.
 */
export function generateTicketEmailHtml(
  attendee: Attendee,
  qrCodeCid: string,
): string { // Removed downloadUrl as it's no longer needed
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Event Ticket</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f2f5; /* Light grey background */
            color: #333;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08); /* Softer, larger shadow */
            border: 1px solid #e0e0e0; /* Subtle border */
        }
        .header {
            background-color: #8A2BE2; /* Purplish accent */
            color: #ffffff;
            padding: 25px;
            text-align: center;
            border-bottom: 5px solid #6A1AAB; /* Darker purple border for accent */
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .content p {
            margin-bottom: 15px;
            line-height: 1.8; /* Increased line-height for readability */
        }
        .qr-code-wrapper {
            margin: 35px auto; /* More vertical space */
            padding: 15px; /* More padding */
            border: 2px dashed #8A2BE2; /* Dashed purple border for visual appeal */
            border-radius: 8px;
            display: inline-block;
            background-color: #f9f9f9; /* Slightly different background for the QR area */
        }
        .qr-code {
            max-width: 220px; /* Slightly larger QR code */
            height: auto;
            display: block;
            margin: 0 auto;
        }
        .instructions {
            margin-top: 30px;
            padding: 20px;
            background-color: #f0f8ff; /* Light blue background for instructions */
            border-left: 5px solid #8A2BE2; /* Matching purple accent */
            text-align: left;
            border-radius: 0 0 12px 12px; /* Rounded bottom corners for instructions block */
        }
        .instructions p {
            font-size: 14px;
            color: #555;
            margin-bottom: 10px;
        }
        .instructions ul {
            list-style-type: none; /* Remove default bullet points */
            padding: 0;
            margin-top: 10px;
        }
        .instructions li {
            position: relative;
            padding-left: 25px;
            margin-bottom: 8px;
            font-size: 14px;
            color: #444;
        }
        .instructions li:before {
            content: '✓'; /* Custom checkmark */
            color: #28a745; /* Green checkmark */
            position: absolute;
            left: 0;
            top: 0;
            font-weight: bold;
        }
        .screenshot-hint {
            margin-top: 25px;
            font-size: 14px;
            color: #666;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Your Event Ticket</h1>
        </div>
        <div class="content">
            <p>Hello, <strong>${attendee.full_name}</strong>!</p>
            <p>Thank you for registering for our event. Here is your unique ticket QR code:</p>
            <div class="qr-code-wrapper">
                <img src="cid:${qrCodeCid}" alt="Your Ticket QR Code" class="qr-code"/>
            </div>
            <p class="screenshot-hint">
                <strong style="color: #8A2BE2;">Pro Tip:</strong> Screenshot this QR code on your phone for quick and easy access during the event!
            </p>
        </div>
        <div class="instructions">
            <p style="font-weight: bold; font-size: 16px; color: #333;">Important Information:</p>
            <ul>
                <li>Please present this QR code for check-in upon arrival.</li>
                <li>This QR code will also be required to claim your lunch.</li>
                <li>You will need to scan this QR code when entering sessions and workshops.</li>
            </ul>
            <p style="margin-top: 15px; font-size: 13px; color: #777;">
                We look forward to seeing you there!
            </p>
        </div>
    </div>
</body>
</html>
  `;
}
