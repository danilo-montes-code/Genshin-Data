const passport      = require('passport'),
      mongoose      = require('mongoose'),
      LocalStrategy = require('passport-local').Strategy,
      User          = mongoose.model('User');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());