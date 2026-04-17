import nodemailer from 'nodemailer';

/**
 * Sends a booking confirmation email/invoice to the user.
 * @param {Object} booking - The booking data.
 * @param {string} userEmail - The recipient's email address.
 */
export async function sendBookingInvoice(booking, userEmail) {
  // Use environment variables for SMTP settings
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST || 'smtp.ethereal.email',
    port: process.env.EMAIL_SERVER_PORT || 587,
    secure: process.env.EMAIL_SERVER_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER || 'mock-user',
      pass: process.env.EMAIL_SERVER_PASSWORD || 'mock-pass',
    },
  });

  const invoiceHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #007bff; text-align: center;">Care.xyz Booking Invoice</h2>
      <p>Dear ${booking.userName || 'Valued Customer'},</p>
      <p>Thank you for choosing Care.xyz. Your booking has been successfully created and is currently <strong>PENDING</strong> confirmation.</p>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Order Summary</h3>
        <table style="width: 100%;">
          <tr>
            <td><strong>Service:</strong></td>
            <td style="text-align: right;">${booking.serviceName}</td>
          </tr>
          <tr>
            <td><strong>Duration:</strong></td>
            <td style="text-align: right;">${booking.durationValue} ${booking.durationPlan}(s)</td>
          </tr>
          <tr>
            <td><strong>Location:</strong></td>
            <td style="text-align: right;">${booking.location.area}, ${booking.location.district}</td>
          </tr>
          <tr style="font-size: 1.2em; color: #333;">
            <td><strong>Total Amount:</strong></td>
            <td style="text-align: right;"><strong>৳${booking.totalPrice.toLocaleString()}</strong></td>
          </tr>
        </table>
      </div>
      
      <p>Our team will contact you shortly to confirm the caregiver details.</p>
      <p style="font-size: 0.9em; color: #777;">If you have any questions, please reply to this email.</p>
      <hr />
      <p style="text-align: center; color: #aaa; font-size: 0.8em;">&copy; 2026 Care.xyz. All rights reserved.</p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Care.xyz" <${process.env.EMAIL_FROM || 'no-reply@care.xyz'}>`,
      to: userEmail,
      subject: `Booking Confirmation: ${booking.serviceName}`,
      html: invoiceHtml,
    });
    console.log('[EMAIL] Invoice sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('[EMAIL] Failed to send invoice:', error);
    // We don't throw error here to avoid failing the booking creation if email fails
    return null;
  }
}
