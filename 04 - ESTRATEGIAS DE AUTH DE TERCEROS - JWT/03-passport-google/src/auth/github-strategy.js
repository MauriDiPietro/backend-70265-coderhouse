import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import "dotenv/config";
import { getUserByEmail, getUserById, register } from "../services/user.services.js";

const strategyConfig = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:8080/users/profile-github",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  try {
    // console.log("profile", profile);
    const email = profile._json.email !== null ? profile._json.email : profile._json.notification_email ? profile._json.notification_email : '';
    const user = await getUserByEmail(email);
    if(user) return done(null, user);
    const newUser = await register({
        first_name: profile._json.name.split(' ')[0],
        last_name: profile._json.name.split(' ').length > 2 ? `${profile._json.name.split(' ')[1]} ${profile._json.name.split(' ')[2]}` : profile._json.name.split(' ')[1],
        email,
        isGithub: true
    });
    return done(null, newUser);
  } catch (error) {
    done(error);
  }
};

passport.use("github", new GithubStrategy(strategyConfig, registerOrLogin));

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
