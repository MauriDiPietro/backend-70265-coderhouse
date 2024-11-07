import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/set-cookie", (req, res) => {
  res.cookie("idioma", "ingles", { maxAge: 60000 }).json({ msg: "ok" });
});

app.get("/get-cookie", (req, res) => {
  console.log(req.cookies);
  console.log(req.signedCookies);
  const { idioma } = req.cookies;
  idioma === "ingles" ? res.send("hello!") : res.send("hola!");
});

app.get("/set-signed-cookie", (req, res) => {
  res
    .cookie("nombre", "pedro", { signed: true, maxAge: 120000 })
    .json({ msg: "ok" });
});

app.get("/clear", (req, res) => {
  res.clearCookie("nombre").json({ msg: "ok" });
});

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
