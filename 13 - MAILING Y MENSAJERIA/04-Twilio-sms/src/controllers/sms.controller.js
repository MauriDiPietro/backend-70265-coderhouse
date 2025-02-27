import { twilioClient } from '../services/sms.service.js';
import 'dotenv/config'

export const sendSms = async(req, res) =>{
    try{
        const message = {
            body: req.body.message,
            from: process.env.SMS,
            to: req.body.dest,
            // mediaUrl: [""]
        }
        const response = await twilioClient.messages.create(message);
        res.json(response);
    }catch(error){
        console.log(error);
    }
}