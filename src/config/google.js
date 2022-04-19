const passport = require("passport");
const User = require("../user/user_model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      callbackURL  : process.env.GOOGLE_CALLBACK_URL,
      clientID     : process.env.GOOGLE_CLIENT_ID,
      clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
     console.log("user profile is: ", profile)
    }
  )
);