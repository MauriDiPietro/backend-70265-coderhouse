import { mailConfig, mailConfigHbd, transporter } from "../services/email.service.js"

export const sendMailEthereal = async (req, res)=>{
    try {
        const response = await transporter.sendMail(mailConfig);
        res.json(response)
    } catch (error) {
        res.send(error.message)
    }
}

export const sendMailHbsEthereal = async (req, res)=>{
    try {
        const response = await transporter.sendMail(mailConfigHbd);
        res.json(response)
    } catch (error) {
        res.send(error.message)
    }
}