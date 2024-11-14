import { Router } from "express";
import userManager from "../managers/user.manager.js";
const router = Router();

router.post("/register", async (req, res) => {
  try {
    const newUser = await userManager.register(req.body);
    if (!newUser)
      return res.redirect("/error", { message: "usuario existente" });
    return res.redirect("/");
  } catch (error) {
    res.render("error", { error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userManager.login(email, password);
    if (user) {
      req.session.email = email;
      res.render("home");
    }
  } catch (error) {
    res.render("error", { error });
  }
});

export default router;
