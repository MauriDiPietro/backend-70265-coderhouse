import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import "dotenv/config";
import { userService } from "../services/user.services.js";

const strategyConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const verifyToken = async (jwt_payload, done) => {
  //req.user = jwt_payload
  if (!jwt_payload) return done(null, false, { messages: "Usuario inexistente" });
  return done(null, jwt_payload);
};

passport.use("jwt", new JwtStrategy(strategyConfig, verifyToken));

/* ------------------------------------ - ----------------------------------- */

const cookieExtractor = (req) => {
  return req.cookies.token;
};

const strategyCookiesConfig = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use('jwtCookies', new JwtStrategy(strategyCookiesConfig, verifyToken));

/* ------------------------------------ - ----------------------------------- */

passport.serializeUser((user, done) => {
  try {
    done(null, user._id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getById(id);
    return done(null, user);
  } catch (error) {
    done(error);
  }
});
