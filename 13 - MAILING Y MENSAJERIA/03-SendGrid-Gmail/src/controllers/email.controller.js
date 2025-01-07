import sgMail from "../services/email.service.js";

export const sendGmail = async(req, res) => {
    try {
        const { dest, name } = req.body;
        const gmailConfig = {
            from: process.env.EMAIL,
            to: dest,
            subject: 'Saludo de bienvenida',
            html: `<h1>Bienvenido/a ${name} a Coderhouse</h1`,
            mail_settings: {
                sandbox_mode: {
                    enable: true
                }
            }
        }
        const response = await sgMail.send(gmailConfig);
        res.json(response)
    } catch (error) {
        res.send(error)
    }
}