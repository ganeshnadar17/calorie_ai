import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

// MySQL connection pool
const pool = mysql.createPool({
  socketPath: '/tmp/mysql.sock',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'calorie_ai',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
const testConnection = async () => {
  try {
    console.log('Testing MySQL connection...');
    const connection = await pool.getConnection();
    await connection.query('SELECT 1');
    console.log('Successfully connected to MySQL database');
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    console.log('Testing SMTP connection with following config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER
    });
    await transporter.verify();
    console.log('SMTP connection successful');
  } catch (error) {
    console.error('Error connecting to SMTP server:', error);
    throw error;
  }
};

// Send confirmation email
const sendConfirmationEmail = async (name: string, email: string) => {
  console.log(`Attempting to send confirmation email to ${email}`);
  try {
    const mailOptions = {
      from: {
        name: 'Calorie AI',
        address: process.env.SMTP_FROM || ''
      },
      to: email,
      subject: 'Thank you for contacting Calorie AI',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for contacting us, ${name}!</h2>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p>In the meantime, feel free to explore more features of Calorie AI:</p>
          <ul>
            <li>Track your daily calories</li>
            <li>Get nutritional insights</li>
            <li>Analyze food photos</li>
          </ul>
          <p>Best regards,<br>The Calorie AI Team</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      throw new Error('Missing required fields');
    }
    
    const connection = await pool.getConnection();
    
    // Save to database
    console.log('Saving to database...');
    await connection.execute(
      'INSERT INTO contact_messages (name, email, message, created_at) VALUES (?, ?, ?, NOW())',
      [name, email, message]
    );
    
    connection.release();
    console.log('Successfully saved to database');

    // Send confirmation email
    console.log('Sending confirmation email...');
    await sendConfirmationEmail(name, email);
    console.log('Email sent successfully');
    
    res.status(200).json({ 
      success: true, 
      message: 'Message saved successfully and confirmation email sent' 
    });
  } catch (error: any) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to process your message' 
    });
  }
});

// Start server only after testing connections
console.log('Starting server initialization...');
Promise.all([testConnection(), testEmailConfig()])
  .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Server initialization failed:', error);
    process.exit(1);
  }); 