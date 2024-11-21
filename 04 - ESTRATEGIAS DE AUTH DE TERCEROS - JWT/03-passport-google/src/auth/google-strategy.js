//npm i passport-google-oauth20
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import "dotenv/config";
import {
  getUserByEmail,
  getUserById,
  register,
} from "../services/user.services.js";

const strategyConfig = {
  clientID: process.env.CLIENT_ID_GOOGLE,
  clientSecret: process.env.CLIENT_SECRET_GOOGLE,
  callbackURL: "/users/oauth2/redirect/accounts.google.com",
  scope: ["profile", "email"],
  state: true,
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  try {
    // console.log("profile", profile);
    const email = profile._json.email;
    const user = await getUserByEmail(email);
    if (user) return done(null, user);
    const newUser = await register({
      first_name: profile._json.given_name,
      last_name: profile._json.family_name,
      email,
      image: profile._json.picture,
      isGoogle: true,
    });
    return done(null, newUser);
  } catch (error) {
    done(error);
  }
};

passport.use("google", new GoogleStrategy(strategyConfig, registerOrLogin));

passport.serializeUser((user, done) => {
  try {
    done(null, user._id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    return done(null, user);
  } catch (error) {
    done(error);
  }
});
