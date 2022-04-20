// requires
require("dotenv").config(); // environment variabes
require('./src/models/db'); // database

//const passport = require('passport');
const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const User = require('./src/models/user_model');

// view engine setup
app.set('view engine', 'hbs');

// sessions and flash
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  };
app.use(session(sessionOptions));

// body parsing
app.use(express.urlencoded({ extended: false }));

// static
app.use(express.static(path.join(__dirname, 'public')));

// passport setup
// app.use(passport.initialize());
// app.use(passport.session());
// require('./src/config/passport');

// have middleware that deserializes the logged in user
// if req.session.user exists, then create property req.user that contains the user obj
app.use(async (req, res, next) => {
  if(req.session.username) {
    req.user = await User.findOne({username: req.session.username}).exec();
  }
  next();
});

// routers
const baseRouter = require('./routes/index.js');
const userRouter = require('./routes/user.js');
app.use('/', baseRouter);
app.use('/user', userRouter);

// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


// start server
app.listen(process.env.PORT || 3000, 
  () => {console.log('server started');}
);