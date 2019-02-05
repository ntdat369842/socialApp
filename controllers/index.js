const express = require('express');
const passport = require('passport');

const User = require('../models/user');
const routerSignup = require('./signup');
const routerUser = require('./user');
const routerLogin = require('./login');
const routerLogout = require('./logout');
const routerEdit = require('./edit');

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

router.use('/signup', routerSignup);
router.use('/users', routerUser);
router.use('/login', routerLogin);
router.use('/logout', routerLogout);
router.use('/edit', routerEdit);

module.exports = router;