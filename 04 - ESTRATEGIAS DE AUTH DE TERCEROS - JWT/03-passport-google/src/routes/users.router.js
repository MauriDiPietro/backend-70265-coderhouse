import { Router } from "express";
import {
  registerResponse,
  loginResponse,
  githubGoogleResponse,
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

router.get('/profile-github', passportCall('github', { scope: [ 'user:email' ] }), githubGoogleResponse);

//!  |INICIAR SESION CON GOOGLE|
router.get('/oauth2/redirect/accounts.google.com', passportCall('google', { assignProperty: 'user' }), githubGoogleResponse)

export default router;
