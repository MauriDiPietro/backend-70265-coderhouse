import express from "express";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import path from "path";
import loginRouter from "./routes/login.router.js";
import viewsRouter from "./routes/views.router.js";
import "dotenv/config";

const app = express();

app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", loginRouter);
app.use("/", viewsRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(process.cwd(), "src", "views"));
app.set("view engine", "handlebars");

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
