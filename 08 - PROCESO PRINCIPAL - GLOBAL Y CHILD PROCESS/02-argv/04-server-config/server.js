import express from 'express';
import config from './config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = config.PORT;

initMongoDB(()=>console.log('conectado a la db'))

app.listen(PORT, ()=>{
    console.log(`🚀 Server listening on port ${PORT} in ${config.ENV} mode`);
});

