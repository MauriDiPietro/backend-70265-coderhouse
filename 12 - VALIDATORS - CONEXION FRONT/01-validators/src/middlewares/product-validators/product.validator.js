import { param, validationResult } from "express-validator";

export const productValidator = [
  param("id", "Debes insertar un id con mas de 20 caracteres").isLength({
    min: 20,
  }),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(404).send(error);
    }
  },
];
