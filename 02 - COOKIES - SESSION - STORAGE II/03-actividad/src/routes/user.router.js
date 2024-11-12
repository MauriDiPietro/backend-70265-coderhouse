import { Router } from "express";
// import { validateLogin } from "../middlewares/validateLogin.js";
// import { isAdmin } from "../middlewares/isAdmin.js";
// import {
//   login,
//   logout,
//   secretEndpoint,
// } from "../controllers/user.controller.js";
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
  const { email, password } = req.body;
  const user = await userManager.login(email, password);
  if (user) {
    req.session.email = email;
    res.render("home");
  } else res.redirect("error", { message: "credenciales incorrectas" });
});

// router.get("/secret-endpoint", validateLogin, secretEndpoint);

// router.get("/admin-secret-endpoint", validateLogin, isAdmin, secretEndpoint);

// router.get("/logout", logout);

export default router;
