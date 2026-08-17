require('dotenv').config({ path: '../../.env.local' });

const nodemailer = require('nodemailer');

const port = Number(process.env.EMAIL_PORT);
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,
});

transporter.verify()
  .then(() => console.log('SMTP_VERIFY_OK'))
  .catch((error) => {
    console.log('SMTP_VERIFY_FAIL', error.responseCode || '', error.code || '', error.message);
  });
