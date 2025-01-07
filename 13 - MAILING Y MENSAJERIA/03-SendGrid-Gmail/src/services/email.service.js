import sgMail from '@sendgrid/mail';
import 'dotenv/config';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default sgMail;