import express from "express";
import session from "express-session";
import { validateLogin } from "./middlewares/validateLogin.js";
import { isAdmin } from "./middlewares/isAdmin.js";

const app = express();

const sessionConfig = {
  secret: "1234",
  cookie: { maxAge: 300000 },
  saveUninitialized: true,
  resave: false,
};

app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
  {
    username: "juan",
    password: 123456,
    admin: true,
  },
  {
    username: "jose",
    password: 1234,
    admin: false,
  },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const index = users.findIndex(
    (user) => user.username === username && user.password === password
  );
  if (index < 0) res.status(401).json({ msg: "Credenciales incorrectas" });
  else {
    const user = users[index];
    req.session.info = {
        loggedIn: true,
        count: 1,
        admin: user.admin
    }

    //req.session.leggedIn = true
    //req.session.admin = user.admin
    res.json({msg: 'bienvenido!'})
  }
});

app.get('/secret-endpoint', validateLogin, (req, res)=>{
    req.session.info.count++
    res.json({
        msg: 'endpoint secreto',
        contador: req.session.info.count,
        session: req.session
    })
})

app.get('/admin-secret-endpoint', validateLogin, isAdmin, (req, res)=>{
    req.session.info.count++
    res.json({
        msg: 'endpoint secreto ADMIN',
        contador: req.session.info.count,
        session: req.session
    })
})

app.get('/logout', (req, res)=>{
    req.session.destroy()
    res.json({msg: 'logout ok'})
})

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
