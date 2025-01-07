import { transporter } from "../services/email.service.js";
import { templateHtml } from "../services/template.js";

export const sendGmail = async(req, res) => {
    try {
        const { dest, name } = req.body;
        const gmailConfig = {
            from: process.env.EMAIL,
            to: dest,
            subject: 'Saludo de bienvenida',
            html: templateHtml(name),
            attachments: [
                {
                    path: `${process.cwd()}/src/controllers/texto.txt`,
                    filename: `resumen-${name}.txt`
                }
            ]
        }
        const response = await transporter.sendMail(gmailConfig);
        res.json(response)
    } catch (error) {
        res.send(error)
    }
}