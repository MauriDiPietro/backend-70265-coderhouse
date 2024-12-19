/* ---------------------------- express-validator --------------------------- */

import { check, validationResult } from "express-validator";

export const userValidator = [
  check("first_name").exists().not().isEmpty().isString(),
  check("last_name").exists().not().isEmpty().isString(),
  check("email", "Debes insertar un email válido").exists().isEmail(),
  check("password").exists().not().isEmpty().isLength({ min: 8 }),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(404).send(error);
    }
  },
];

/* ------------------------------------ Joi ----------------------------------- */

import Joi from "joi";

const registerSchema = Joi.object({
  first_name: Joi.string().min(3).max(30).required(),
  last_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }), // tlds: { allow: ['com', 'net', 'es'] }
  age: Joi.number(),
  password: Joi.string().alphanum().min(8).max(30), //.pattern(new RegExp())
});

export const userValidatorJoi = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  error ? res.status(400).send(error) : next();
};

/* ------------------------------------ JSON Schema ----------------------------------- */

//npm i ajv ajv-errors ajv-formats @sinclari/typebox

import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true })

addFormats(ajv, ["email"])

addErrors(ajv);

const registerUserSchema = Type.Object({
  first_name: Type.String(),
  last_name: Type.String(),
  email: Type.String({
    format: "email",
    errorMessage: {
      type: "debe ser un texto",
      format: "debe ser un email valido",
    },
  }),
  password: Type.String(),
});

const validate = ajv.compile(registerUserSchema);

export const userValidatorJSONSchema = (req, res, next) => {
  const isValid = validate(req.body);
  if(!isValid) return res.status(404).send(ajv.errorsText(validate.errors, { separator: "\n" }));
  return next()
}