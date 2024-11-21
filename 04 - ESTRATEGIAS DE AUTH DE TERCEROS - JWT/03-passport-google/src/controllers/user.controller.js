import * as services from "../services/user.services.js";

export const registerResponse = (req, res, next) => {
  try {
    res.json({
      message: "Register OK",
      session: req.session,
    });
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

export const githubGoogleResponse = (req, res, next) => {
  try {
    //req.user
    const { first_name, last_name, email, isGithub, isGoogle, image } = req.user;
    res.json({
      msg: "Register/Login Github OK",
      session: req.session,
      userData: {
        first_name,
        last_name,
        email,
        isGithub,
        isGoogle,
        image
      },
    });
  } catch (error) {
    next(error);
  }
};
