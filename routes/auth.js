const express = require('express');
const router = express.Router();
const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const User = require('../src/models/user_model');
// const argon2 = require('argon2');

// passport.use(
//     new LocalStrategy(async (username, password, done) => {
//         // find user, if it already exists
//         const user = await User.findOne({username: username}).exec();

//         // if user exists
//         if (user) {
//             // see if password was correct
//             if (await argon2.verify(user.password, password)) {
//                 return done(null, user);
//             } else {
//                 return done(null, false, {'message' : 'wrong password'});
//             }
//         } else {
//             return done(null, false, {'message' : 'wrong username'});
//         }
//     })
// );

// login
router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

// register
router.get('/register', function(req, res) {
    res.render('register');
})

module.exports = router;