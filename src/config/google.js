const passport = require("passport");
const UserService = require('../user');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      callbackURL  : process.env.GOOGLE_CALLBACK_URL,
      clientID     : process.env.GOOGLE_CLIENT_ID,
      clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      const id = profile.id;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const profilePhoto = profile.photos[0].value;

      const currentUser = await UserService.getUserById({ id });

      if (!currentUser) {
        const newUser = await UserService.addGoogleUser({
          id,
          firstName,
          lastName,
          profilePhoto
        });
        return done(null, newUser);
      }

      currentUser.lastVisited = new Date();
      return done(null, currentUser);
    }
  )
);
