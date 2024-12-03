import { Router as CustomRouter } from "express";

export default class Router {
  constructor() {
    this.router = CustomRouter(); //const router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  //get('/path', midd1, midd2, midd3, (cb))
  get(path, roles, ...cb) {
    this.router.get(path, this.resolveCallbacks(cb), this.managerRoles(roles));
  }
  post(path, roles, ...cb) {
    this.router.post(path, this.resolveCallbacks(cb), this.managerRoles(roles));
  }
  put(path, roles, ...cb) {
    this.router.put(path, this.resolveCallbacks(cb), this.managerRoles(roles));
  }
  delete(path, roles, ...cb) {
    this.router.delete(
      path,
      this.resolveCallbacks(cb),
      this.managerRoles(roles)
    );
  }

  resolveCallbacks(callbacks) {
    return callbacks.map((cb) => async (...params) => {
      try {
        await cb.apply(this, params);
      } catch (error) {
        throw new Error(error);
      }
    });
  }

  managerRoles(roles) {
    //['ADMIN']
    return async (req, res, next) => {
      console.log('entra');
      console.log(req.user)
      if (roles.includes("PUBLIC")) return next();
      if (!req.user) return res.status(401).json({ error: "Unauthorized" });
      if (!roles.includes(req.user.role)) return res.status(403).json({ error: "Forbidden" });
      if(roles.includes(req.user.role)) return next();
    };
  }
}
