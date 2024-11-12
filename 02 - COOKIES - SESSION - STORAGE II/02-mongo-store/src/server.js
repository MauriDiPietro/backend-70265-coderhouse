import express from "express";
import session from "express-session";
import userRouter from "./routes/user.router.js";
import cookieParser from "cookie-parser";
import { initMongoDB } from "./config/db.connection.js";
import MongoStore from 'connect-mongo';
import 'dotenv/config'

const app = express();

const mongoStoreConfig = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    // crypto: {
    //   secret: '1234'
    // },
    ttl: 60,
  }),
  secret: "1234",
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
  resave: false,
};

app.use(session(mongoStoreConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", userRouter);

initMongoDB()
  .then(() => console.log("conectado a mongo"))
  .catch((error) => console.log(error));

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
