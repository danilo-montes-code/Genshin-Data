// requires
require('./db');
require('./auth');
const passport = require('passport');
const express = require('express');
const path = require('path');
const app = express();
const baseRouter = require('./routes/index.js');

// view engine setup
app.set('view engine', 'hbs');

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// routes
app.use(baseRouter);

// start server
app.listen(process.env.PORT || 3000);
console.log('server started');
