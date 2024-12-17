import { Router } from "express";
import {
  userController,
} from "../controllers/user.controller.js";
import { passportCall } from "../passport/passportCall.js";
import { roleAuth } from '../middlewares/roleAuth.js'

const router = Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/private-headers", passportCall('jwt'), userController.privateData);

router.get("/private-cookies", [passportCall('jwtCookies'), roleAuth('user')], userController.privateData);

router.get("/private-cookies-admin", [passportCall('jwtCookies'), roleAuth('admin')], userController.privateData);



export default router;