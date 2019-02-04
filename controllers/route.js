const express = require('express');
const passport = require('passport');

const User = require('./../models/user');

let router = express.Router();

router.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error');
    res.locals.infos = req.flash('info');
    next();
});

router.get('/', (req, res, next) => {
    User.find()
        .sort({
            createdAt: 'descending'
        })
        .exec((err, users) => {

            if (err) {
                return next(err);
            }

            res.render('index', {
                users,
            });
        });
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/signup', (req, res, next) => {
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

router.get('/users/:username', (req, res, next) => {
    let username = req.params.username;
    User.findOne({
        username
    }, (err, user) => {

        if (err) {
            return next(err);
        }

        if (!user) {
            return next(404);
        }

        res.render('profile', {
            user
        })
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/edit', (req, res, next) => {

    if ( req.isAuthenticated() ) {
        next();
    } else {
        req.flash('info', 'You must be logged in to see this page');
        res.redirect('/login');
    }

}, (req, res) => {
    res.render('edit');
});

router.post('/edit', (req, res, next) => {

    if ( req.isAuthenticated() ) {
        next();
    } else {
        req.flash('info', 'You must be logged in to see this page');
        res.redirect('/login');
    }

}, (req, res, next) => {
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