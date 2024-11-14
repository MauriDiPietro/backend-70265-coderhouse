import * as services from "../services/user.services.js";

export const registerResponse = (req, res, next) => {
  try {
    res.json({
      message: 'Register OK',
      session: req.session
    })
  } catch (error) {
    next(error);
  }
};

export const loginResponse = async (req, res, next) => {
  try {
    //req.session.passport.user
    const id = req.session.passport.user || null;
    const user = await services.getUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
