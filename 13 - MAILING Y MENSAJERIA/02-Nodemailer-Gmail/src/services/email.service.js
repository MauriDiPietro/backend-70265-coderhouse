import { createTransport } from 'nodemailer';
import 'dotenv/config';
import { templateHtml } from './template.js';

export const transporter = createTransport({
    service: 'gmail',
    secure: true,
    port: process.env.PORT_GMAIL,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});