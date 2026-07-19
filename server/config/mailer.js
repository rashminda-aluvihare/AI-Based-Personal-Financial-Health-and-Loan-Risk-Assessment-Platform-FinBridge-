const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Setup Nodemailer SMTP transport using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '', // Your SMTP email
    pass: process.env.SMTP_PASS || ''  // Your SMTP password
  }
});

/**
 * Sends an email notification to the Admin when a new user registers
 * @param {object} user - New user details { name, email, phone, role }
 */
const sendAdminRegistrationAlert = async (user) => {
  const adminEmail = process.env.SYS_ADMIN_EMAIL || 'rashmindaaluvihare447@gmail.com';
  
  const mailOptions = {
    from: `"FinBridge Platform" <${process.env.SMTP_USER || 'noreply@finbridge.lk'}>`,
    to: adminEmail,
    subject: '🔔 Alert: New User Registered on FinBridge',
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 12px;">
        <h2 style="color: #6C63FF; border-bottom: 2px solid #6C63FF; padding-bottom: 8px;">New Registration Alert</h2>
        <p>Hello Admin,</p>
        <p>A new user has successfully registered on the **FinBridge** platform. Here are the account details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Full Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${user.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${user.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${user.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Role assigned:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-transform: uppercase; font-weight: bold; color: #00D4AA;">${user.role}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Timestamp:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-family: monospace;">${new Date().toUTCString()}</td>
          </tr>
        </table>
        
        <p style="margin-top: 20px; font-size: 11px; color: #888;">
          This is an automated notification. Please do not reply directly to this mail. To audit or view user details, log into your <a href="https://finbridge-xi.vercel.app/dashboard" style="color: #6C63FF; text-decoration: none; font-weight: bold;">Admin Console</a>.
        </p>
      </div>
    `
  };

  // If SMTP configurations are not fully set, simulate send to console so server doesn't throw errors
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(`[MAIL SIMULATOR] registration alert mail sent to admin (${adminEmail}) for user ${user.name}`);
    return;
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Admin registration alert email sent successfully: %s', info.messageId);
  } catch (error) {
    console.error('Failed to send admin registration alert email:', error.message);
  }
};

module.exports = {
  sendAdminRegistrationAlert
};
