import express from 'express';

const app = express();

app.arguments(express.json())

const PORT = 8080;

app.listen(PORT, ()=>console.log('server ok'))