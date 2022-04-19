// const mongoose = require('mongoose'),
// passport = require('passport'),
// LocalStrategy = require('passport-local').Strategy,
// User = mongoose.model('User');

// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
const express = require('express');
const passport = require('passport');
const db = require('../db');
require('dotenv').config();

const router = express.Router();

// login
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get("/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);
  
router.get("/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/",
        successRedirect: "/profile",
        failureFlash: true,
        successFlash: "Successfully logged in!",
    })
);

module.exports = router;