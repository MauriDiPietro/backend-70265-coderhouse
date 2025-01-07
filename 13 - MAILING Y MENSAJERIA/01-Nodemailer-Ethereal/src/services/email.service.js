import { createTransport } from 'nodemailer';
import 'dotenv/config';
import { templateHtml } from '../../../02-Nodemailer-Gmail/src/services/template.js';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

export const transporter = createTransport({
    host: process.env.HOST,
    port: process.env.PORT_ETHEREAL,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

export const mailConfig = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Bienvenido/a',
    // text: 'este es el texto del mail'
    // html: '<h1>Bienvenido/a a Coderhouse!</h1>'
    html: templateHtml,
    attachments: [
        {
            path: `${process.cwd()}/src/services/texto.txt`,
            filename: 'resumen-de-cuenta.txt'
        }
    ]
}

/* ------------------------------------ - ----------------------------------- */

const hbsConfig = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./src/views'),
        defaultLayout: false
    },
    viewPath: path.resolve('./src/views'),
    extName: '.handlebars'
}

transporter.use('compile', hbs(hbsConfig));

export const mailConfigHbd = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Utilizando handlebars',
    template: 'email',
    context: {
        name: 'Juan',
        text: 'Estamos muy contentos de que formes parte de la comunidad de Coderhouse!.'
    }
}