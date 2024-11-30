import express from "express";
import cookieParser from "cookie-parser";
import handlebars from 'express-handlebars';
import usersRouter from "./routes/users.router.js";
import viewsRouter from './routes/views.router.js';
import { initMongoDB } from "./db/connection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import 'dotenv/config';
import { __dirname } from "./utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use("/users", usersRouter);
app.use('/', viewsRouter);

app.use(errorHandler);

initMongoDB().then(()=>console.log('base de datos coenctada'))
  .catch((error)=>console.log(error))

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});
