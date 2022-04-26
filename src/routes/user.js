const express  = require('express'),
      router   = express.Router(),
      passport = require('passport'),
      mongoose = require('mongoose'),
      User     = mongoose.model('User');

// login and register from initial template

// REGISTER
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    
    User.register(new User({username}), password, (err, user) => {
        if (err) {
          res.render('register', {error:'Your registration information is not valid'});
        } else {
          passport.authenticate('local')(req, res, function() {
            res.redirect('/');
          });
        }
    });

    // const existingUser = await User.findOne({username: username}).exec();
    // //console.log('existingUser', existingUser);
    // if(!existingUser) {
    // const hash = await argon2.hash(password);
    // await (new User({username, password: hash})).save();
    // res.redirect('/');
    // } else {
    // res.render('register', {error: 'could not register'});
    // }
});


// LOGIN
router.get('/login', (req, res) => {
    res.render('login');
});
  
router.post('/login', async (req, res) => {

    passport.authenticate('local', (err, user) => {
        if (user) {
            req.logIn(user, (err) => {
                res.redirect('/');
            });
        } else {
            res.render('login', {error: 'Your username or password is incorrect.'})
        }
    })(req, res, next);

    // const {username, password} = req.body;
    // const user = await User.findOne({username: username}).exec();
    // // console.log('LOGIN: existingUser', user);
    // if(user) {
    // // user.passwordr is from db, password is incoming pw
    // if(await argon2.verify(user.password, password)) {
    //     // this creates our "authenticated" session
    //     // "serializing" the user
    //     req.session.username = user.username;
    //     res.redirect('/');
    // } else {
    //     res.render('login', {error: 'login failed'});
    // }
    // } else {
    //   res.render('login', {error: 'login failed'});
    // }
});


// LOGOUT   
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;