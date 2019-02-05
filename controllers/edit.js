const express = require('express');
const passport = require('passport');

const User = require('./../models/user');

let router = express.Router();

let ensureAuthenticated = (req, res, next) => {

    if ( req.isAuthenticated() ) {
        next();
    } else {
        req.flash('info', 'You must be logged in to see this page');
        res.redirect('/login');
    }

}

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('edit');
});

router.post('/', ensureAuthenticated, (req, res, next) => {
    req.user.displayName = req.body.displayName;
    req.user.bio = req.body.bio;
    req.user.save((err) => {

        if (err) {
            next(err);
            return;
        }

        req.flash('info', 'Profile updated');
        res.redirect('/edit');
    })
});

module.exports = router;