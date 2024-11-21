import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import usersRouter from "./routes/users.router.js";
import { initMongoDB } from "./db/connection.js";
import MongoStore from 'connect-mongo';
import { errorHandler } from "./middlewares/errorHandler.js";
import passport from "passport";
import './auth/local-strategy.js';
import "./auth/github-strategy.js"; 
import handlebars from "express-handlebars";
import viewsRoutes from './routes/views.router.js';
import path from 'path';
import 'dotenv/config';

const app = express();

const storeConfig = {
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      crypto: { secret: process.env.SECRET_KEY },
      ttl: 180,
  }),
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session(storeConfig));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(process.cwd(), "src", "views"));
app.set("view engine", "handlebars");

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", usersRouter);
app.use("/", viewsRoutes);

app.use(errorHandler);

initMongoDB().then(()=>console.log('base de datos coenctada'))
  .catch((error)=>console.log(error))

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});
