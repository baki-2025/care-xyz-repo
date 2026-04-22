import nodemailer from 'nodemailer';

/**
 * Create and configure nodemailer transporter
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: process.env.EMAIL_SERVER_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER || 'mock-user',
      pass: process.env.EMAIL_SERVER_PASSWORD || 'mock-pass',
    },
  });
}

/**
 * Sends a booking confirmation email/invoice to the user.
 * @param {Object} booking - The booking data.
 * @param {string} userEmail - The recipient's email address.
 */
export async function sendBookingInvoice(booking, userEmail) {
  const transporter = createTransporter();

  const invoiceHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #007bff; text-align: center;">Care.xyz Booking Invoice</h2>
      <p>Dear ${booking.userName || 'Valued Customer'},</p>
      <p>Thank you for choosing Care.xyz. Your booking has been successfully created and is currently <strong>${booking.status.toUpperCase()}</strong>.</p>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Booking Details</h3>
        <table style="width: 100%;">
          <tr>
            <td><strong>Booking ID:</strong></td>
            <td style="text-align: right;">${booking._id}</td>
          </tr>
          <tr>
            <td><strong>Date:</strong></td>
            <td style="text-align: right;">${new Date(booking.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
          </tr>
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
            <td style="text-align: right;">${booking.location.address}, ${booking.location.area}, ${booking.location.district}</td>
          </tr>
          <tr>
            <td><strong>Payment Status:</strong></td>
            <td style="text-align: right;">${booking.paymentStatus.toUpperCase()}</td>
          </tr>
          <tr style="font-size: 1.2em; color: #333;">
            <td><strong>Total Amount:</strong></td>
            <td style="text-align: right;"><strong>৳${booking.totalPrice.toLocaleString()}</strong></td>
          </tr>
        </table>
      </div>
      
      <p>Our team will contact you shortly to confirm the caregiver details and schedule.</p>
      <p style="font-size: 0.9em; color: #777;">If you have any questions, please reply to this email or contact our support team.</p>
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

/**
 * Sends a welcome email to newly registered users.
 * @param {string} userName - The user's name.
 * @param {string} userEmail - The recipient's email address.
 */
export async function sendWelcomeEmail(userName, userEmail) {
  const transporter = createTransporter();

  const welcomeHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #007bff; text-align: center;">Welcome to Care.xyz! 🎉</h2>
      <p>Hi ${userName},</p>
      <p>Thank you for registering with <strong>Care.xyz</strong>. We're excited to have you on board!</p>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">What's Next?</h3>
        <ul style="line-height: 1.8;">
          <li>Browse our comprehensive <strong>elderly care services</strong></li>
          <li>Book a caregiver based on your specific needs</li>
          <li>Track your bookings in real-time</li>
          <li>Receive invoice confirmations via email</li>
        </ul>
      </div>

      <p style="margin: 20px 0;">
        <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/services/elderly" style="display: inline-block; background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Browse Services
        </a>
      </p>
      
      <p style="font-size: 0.9em; color: #777;">If you have any questions or need assistance, don't hesitate to contact our support team.</p>
      <hr />
      <p style="text-align: center; color: #aaa; font-size: 0.8em;">&copy; 2026 Care.xyz. All rights reserved.</p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Care.xyz" <${process.env.EMAIL_FROM || 'no-reply@care.xyz'}>`,
      to: userEmail,
      subject: `Welcome to Care.xyz, ${userName}!`,
      html: welcomeHtml,
    });
    console.log('[EMAIL] Welcome email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('[EMAIL] Failed to send welcome email:', error);
    return null;
  }
}

/**
 * Sends a password reset email to the user.
 * @param {string} userName - The user's name.
 * @param {string} userEmail - The recipient's email address.
 * @param {string} resetToken - The password reset token.
 */
export async function sendPasswordResetEmail(userName, userEmail, resetToken) {
  const transporter = createTransporter();
  const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

  const resetHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #007bff; text-align: center;">Password Reset Request</h2>
      <p>Hi ${userName},</p>
      <p>We received a request to reset your password. Click the button below to set a new password. <strong>This link will expire in 1 hour.</strong></p>
      
      <p style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="display: inline-block; background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Reset Password
        </a>
      </p>

      <p style="background: #fff3cd; padding: 10px; border-radius: 5px; border-left: 4px solid #ffc107; margin: 20px 0;">
        <strong>Security Tip:</strong> If you didn't request a password reset, you can safely ignore this email. Your account is secure.
      </p>
      
      <p style="font-size: 0.9em; color: #777;">Or copy and paste this link in your browser:<br><code style="word-break: break-all;">${resetUrl}</code></p>
      <hr />
      <p style="text-align: center; color: #aaa; font-size: 0.8em;">&copy; 2026 Care.xyz. All rights reserved.</p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Care.xyz" <${process.env.EMAIL_FROM || 'no-reply@care.xyz'}>`,
      to: userEmail,
      subject: 'Password Reset Request - Care.xyz',
      html: resetHtml,
    });
    console.log('[EMAIL] Password reset email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('[EMAIL] Failed to send password reset email:', error);
    return null;
  }
}

/**
 * Sends a booking cancellation email to the user.
 * @param {Object} booking - The booking data.
 * @param {string} userName - The user's name.
 * @param {string} userEmail - The recipient's email address.
 */
export async function sendBookingCancellationEmail(booking, userName, userEmail) {
  const transporter = createTransporter();

  const cancellationHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #dc3545; text-align: center;">Booking Cancelled</h2>
      <p>Dear ${userName},</p>
      <p>Your booking has been successfully cancelled. Here are the details:</p>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Cancelled Booking Details</h3>
        <table style="width: 100%;">
          <tr>
            <td><strong>Booking ID:</strong></td>
            <td style="text-align: right;">${booking._id}</td>
          </tr>
          <tr>
            <td><strong>Service:</strong></td>
            <td style="text-align: right;">${booking.serviceName}</td>
          </tr>
          <tr>
            <td><strong>Duration:</strong></td>
            <td style="text-align: right;">${booking.durationValue} ${booking.durationPlan}(s)</td>
          </tr>
          <tr>
            <td><strong>Original Amount:</strong></td>
            <td style="text-align: right;">৳${booking.totalPrice.toLocaleString()}</td>
          </tr>
        </table>
      </div>

      <p style="color: #28a745; font-weight: bold;">A refund (if applicable) will be processed within 5-7 business days.</p>
      
      <p style="font-size: 0.9em; color: #777;">If you have any questions about the cancellation, please contact our support team.</p>
      <hr />
      <p style="text-align: center; color: #aaa; font-size: 0.8em;">&copy; 2026 Care.xyz. All rights reserved.</p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Care.xyz" <${process.env.EMAIL_FROM || 'no-reply@care.xyz'}>`,
      to: userEmail,
      subject: `Booking Cancellation Confirmation: ${booking.serviceName}`,
      html: cancellationHtml,
    });
    console.log('[EMAIL] Cancellation email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('[EMAIL] Failed to send cancellation email:', error);
    return null;
  }
}
