// requires
require("dotenv").config(); // environment variabes
require('./src/models/db'); // database
require("./src/config/google"); // authentication

const passport = require('passport');
const express = require('express');
const flash = require("express-flash");
const session = require('express-session');
const app = express();
const path = require('path');

// view engine setup
app.set('view engine', 'hbs');

// sessions and flash
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  };
app.use(session(sessionOptions));
app.use(flash());

// body parsing
app.use(express.urlencoded({ extended: false }));

// static
app.use(express.static(path.join(__dirname, 'public')));

// passport setup
app.use(passport.initialize());
app.use(passport.session());
require("./src/config/passport");
require("./src/config/google");

// routers
const baseRouter = require('./routes/index.js');
const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/user.js');
app.use(baseRouter);
app.use(authRouter);
app.use(userRouter);

// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


// start server
app.listen(process.env.PORT || 3000, 
  () => {console.log('server started');}
);