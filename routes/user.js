const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const mongoose = require('mongoose');
const User = require('../src/models/user_model');

// login/registration code from class
router.get('/login', (req, res) => {
    res.render('login');
});
  
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username: username}).exec();
    // console.log('LOGIN: existingUser', user);
    if(user) {
    // user.passwordr is from db, password is incoming pw
    if(await argon2.verify(user.password, password)) {
        // this creates our "authenticated" session
        // "serializing" the user
        req.session.username = user.username;
        res.redirect('/');
    } else {
        res.render('login', {error: 'login failed'});
    }
    } else {
    res.render('login', {error: 'login failed'});
    }
});


router.get('/register', (req, res) => {
    res.render('register');
});


router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const existingUser = await User.findOne({username: username}).exec();
    console.log('existingUser', existingUser);
    if(!existingUser) {
    const hash = await argon2.hash(password);
    await (new User({username, password: hash})).save();
    res.redirect('/');
    } else {
    res.render('register', {error: 'could not register'});
    }
});

module.exports = router;