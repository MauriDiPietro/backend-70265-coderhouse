import { Router } from 'express';
import { sendMailEthereal, sendMailHbsEthereal } from '../controllers/email.controller.js';

const router = Router();

router.post('/send', sendMailEthereal);
router.post('/sendHbs', sendMailHbsEthereal);

export default router;