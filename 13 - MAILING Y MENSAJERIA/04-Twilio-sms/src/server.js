import express from 'express';
import apiRouter from './routes/sms.router.js';

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server ok en puerto ${PORT}`)
});