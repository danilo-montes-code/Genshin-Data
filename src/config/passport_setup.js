const passport      = require('passport'),
      mongoose      = require('mongoose'),
      LocalStrategy = require('passport-local').Strategy,
      User          = mongoose.model('User');

passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     User.findById(id, function(err, user) {
//         done(err, user);
//     });
// });

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());