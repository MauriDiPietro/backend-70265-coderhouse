import Controllers from "./controller.manager.js";
import { userService } from '../services/user.services.js';

class UserController extends Controllers {
  constructor(){
    super(userService)
  }

  register = async (req, res, next) => {
    try {
      const user = await this.services.register(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };
  
  login = async (req, res, next) => {
    try {
      const token = await this.services.login(req.body);
      // res.header("Authorization", token).json({ message: "Login OK" });
      res.cookie('token', token, { httpOnly: true }).json({ message: 'Login OK' });
    } catch (error) {
      next(error);
    }
  };
  
  privateData = (req, res, next) => {
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
}

