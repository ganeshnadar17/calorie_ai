import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function handleContact(req: Request) {
  const { name, email, phone, address, details } = await req.json();

  // Send notification to admin
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address || 'Not provided'}</p>
      <p><strong>Details:</strong> ${details || 'Not provided'}</p>
    `,
  });

  // Send confirmation to user
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Thank you for contacting us',
    html: `
      <h2>Thank you for contacting us!</h2>
      <p>Dear ${name},</p>
      <p>We have received your inquiry and will get back to you shortly.</p>
      <p>Best regards,<br>Calorie Tracker AI Team</p>
    `,
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
} 