import { Router } from "express";
import { validateLogin } from "../middlewares/validateLogin.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  login,
  logout,
  secretEndpoint,
} from "../controllers/user.controller.js";
const router = Router();

router.post("/login", login);

router.get("/secret-endpoint", validateLogin, secretEndpoint);

router.get("/admin-secret-endpoint", validateLogin, isAdmin, secretEndpoint);

router.get("/logout", logout);

export default router;
