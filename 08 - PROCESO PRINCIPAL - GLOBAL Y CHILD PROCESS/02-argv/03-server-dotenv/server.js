import express from 'express';
import dotenv from 'dotenv'
import { initMongoDB } from './database.js';

const ENV = process.argv[2] || 'dev';

dotenv.config({ path: ENV === 'prod' ? './.env.prod' : ENV === 'dev' ? './.env.dev' : './.env' })

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT

initMongoDB(()=>console.log('conectado a la db'))

app.listen(PORT, ()=>{
    console.log(`🚀 Server listening on port ${PORT} in ${ENV} mode`);
});



