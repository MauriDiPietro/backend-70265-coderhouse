import { Router } from "express";
import {
  registerResponse,
  loginResponse,
  githubResponse,
} from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { passportCall } from "../middlewares/passportCall.js";
import passport from 'passport'

const router = Router();

router.post("/register", passportCall("register"), registerResponse);

router.post("/login", passportCall("login"), loginResponse);

router.get('/register-github', passportCall('github', { scope: [ 'user:email' ] }));  

// router.get('/profile-github', passportCall('github', {  scope: [ 'user:email' ]  } ), githubResponse);

router.get('/profile-github', passport.authenticate('github', {
  failureRedirect: '/login', ///error-login
  successRedirect: '/profile', 
  passReqToCallback: true
}));

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.send('logout ok')
});

router.get("/private", isAuth, (req, res) => res.send("ruta privada"));

export default router;
