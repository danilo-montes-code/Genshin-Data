// requires
require("dotenv").config(); // environment variabes
require('./db'); // database
require("./src/config/google"); // authentication

const passport = require('passport');
const express = require('express');
const app = express();
const path = require('path');

// routers
const baseRouter = require('./routes/index.js');
const authRouter = require('./routes/auth.js');
app.use(baseRouter);
app.use(authRouter);

// view engine setup
app.set('view engine', 'hbs');

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

// body parsing
app.use(express.urlencoded({ extended: false }));

// static
app.use(express.static(path.join(__dirname, 'public')));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});


// start server
app.listen(process.env.PORT || 3000, 
  () => {console.log('server started');}
);