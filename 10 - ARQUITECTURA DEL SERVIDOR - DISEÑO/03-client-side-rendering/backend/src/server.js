import express from "express";
import productsRouter from "./routes/products.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./daos/mongodb/db.conection.js";
import "dotenv/config";
import cors from "cors";

const app = express();

// app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productsRouter);

app.use(errorHandler);

const PERSISTENCE = process.env.PERSISTENCE;

if (PERSISTENCE === "MONGO")
  initMongoDB()
    .then(() => console.log("Conectado a la base de datos de MongoDB"))
    .catch((error) => console.log(error));

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));
