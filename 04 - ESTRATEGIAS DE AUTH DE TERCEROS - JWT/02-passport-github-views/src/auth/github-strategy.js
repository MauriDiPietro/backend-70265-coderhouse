import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import 'dotenv/config'
import { getUserByEmail, register } from "../services/user.services.js";

const strategyOptions = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:8080/users/profile-github",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  try {
    const email =
      profile._json.email !== null
        ? profile._json.email
        : profile._json.notification_email;
    const user = await getUserByEmail(email);
    if (user) return done(null, user);
    const newUser = await register({
      first_name: profile._json.name.split(" ")[0],
      last_name: profile._json.name.split(" ").length > 2
          ? `${profile._json.name.split(" ")[1]} ${profile._json.name.split(" ")[2]}`
          : profile._json.name.split(" ")[1],
      email,
      password: " ",
      isGithub: true,
      image: profile._json.avatar_url
    });
    return done(null, newUser);
  } catch (error) {
    done(error);
  }
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));

passport.serializeUser((user, done) => {
  try {
    done(null, user._id);
  } catch (error) {
    return done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userDao.getById(id);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
