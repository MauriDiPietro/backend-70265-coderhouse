import passport from "passport";

export const passportCall = (strategy, options = {}) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, options, (err, user, info) => {
      if (err) return next(err);
      if (!user)
        return res.status(401).json({
          error: info.messages ? info.messages : info.toString(),
        });
      req.user = user;
      next();
    })(req, res, next);
  };
};
