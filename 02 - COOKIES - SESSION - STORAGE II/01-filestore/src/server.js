import express from "express";
import session from "express-session";
import sessionFileStore from 'session-file-store';
import userRouter from './routes/user.router.js';
import cookieParser from 'cookie-parser';

const app = express();

const FileStore = sessionFileStore(session);

const fileStoreConfig = {
  store: new FileStore({
    path: './sessions',
    ttl: 60,
    reapInterval: 60
  }),
  secret: "1234",
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
  resave: false,
};

app.use(session(fileStoreConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', userRouter);

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
