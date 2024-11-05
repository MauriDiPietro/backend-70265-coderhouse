import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import productRouter from "./routes/product.router.js";
import userRouter from "./routes/user.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use('/products', productRouter);
app.use('/users', userRouter);

app.use(errorHandler);

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
