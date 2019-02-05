const express = require('express');
const passport = require('passport');

const User = require('./../models/user');

let router = express.Router();

router.get('/', (req, res, next) => {
    res.render('signup');
});

router.post('/', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({
        username
    }, (err, user) => {

        if (err) {
            return next(err);
        }

        if (user) {
            req.flash('error', 'User already exists');
            return res.redirect('/signup');
        }

        let newUser = new User({
            username,
            password
        });

        newUser.save(next);
    });
}, passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

module.exports = router;