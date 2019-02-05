const express = require('express');
const passport = require('passport');

let router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;