import { generateToken } from "../auth/jwt.js";
import * as services from "../services/user.services.js";

export const register = async (req, res, next) => {
  try {
    const user = await services.register(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await services.login(req.body);
    const token = generateToken(user);
    // res.header("Authorization", token).json({ message: "Login OK" });
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login OK' });
  } catch (error) {
    next(error);
  }
};

export const privateData = (req, res, next) => {
  try {
    if (!req.user)
      throw new Error("No se puede acceder a los datos del usuario");
    res.json({
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
