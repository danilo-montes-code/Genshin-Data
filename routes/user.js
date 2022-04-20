const express = require('express');
const router = express.Router();

const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
};

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { user: req.user });
});

module.exports = router;