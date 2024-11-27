import { Router } from "express";
import {
  userController,
} from "../controllers/user.controller.js";
import { checkAuthCookies, checkAuthHeaders } from "../middlewares/checkAuth.js";

const router = Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/private-headers", checkAuthHeaders, userController.privateData);

router.get("/private-cookies", checkAuthCookies, userController.privateData);



export default router;