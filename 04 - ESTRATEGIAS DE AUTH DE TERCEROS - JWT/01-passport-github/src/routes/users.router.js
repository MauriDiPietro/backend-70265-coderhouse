import { Router } from "express";
import {
  registerResponse,
  loginResponse,
  githubResponse,
} from "../controllers/user.controller.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import { passportCall } from "../middlewares/passportCall.js";

const router = Router();

router.post("/register", passport.authenticate("register"), registerResponse);

router.post("/login", passport.authenticate("login"), loginResponse);

router.get("/private", isAuth, (req, res) => res.send("ruta privada"));

//!  |INICIAR SESION CON GITHUB|
router.get('/register-github', passportCall('github', { scope: [ 'user:email' ] }));

router.get('/profile-github', passportCall('github', { scope: [ 'user:email' ] }), githubResponse)

export default router;
