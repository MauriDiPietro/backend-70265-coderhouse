import { Router } from "express";
const router = Router();

router.get("/:email", (req, res) => {
  const { email } = req.params;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  // console.log(email.match(emailRegex));    //indice
  // console.log(emailRegex.test(email));    //boolean

  if (email.match(emailRegex)) {
    //llamada al servicio que busca el usuario por email
    return res.send("email válido");
  }
  return res.status(404).send("email inválido");
});

router.get(
  "/get-email/:email([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,})",
  (req, res) => {
    //llamada al servicio que busca el usuario por email
    return res.send("email válido");
  }
);

router.get("/username/:username([a-zA-Z]+)", (req, res) => {
  res.send("username válido");
});

router.get("/email/:emailtest2", (req, res) => {
  res.send("email valido");
});

router.param("emailtest2", (req, res, next, emailtest2) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const isValid = emailtest2.match(emailRegex);
  //llamada al servicio que busca el usuario por email
  if (isValid) return next();
  return res.status(404).send("email inválido");
});

router.all("/admin/*", (req, res, next) => {
  if (!req.isAuthenticated()) return res.status(403).send("Access Denied");
  return next();
});

router.get('/test/ab?cd', (req, res, next) => {
    res.send('test ok')
})

router.get('/test/ab+cd', (req, res, next) => {
    res.send('test ok')
})

router.get(/a/, (req, res, next) => {
  res.send("test ok");
});

router.get(/.*fly$/, (req, res) => {
  res.send("/.*fly$/");
});

router.get("*", (req, res) => {
  res.json({ msg: "Ruta no implementada" });
});

export default router;
