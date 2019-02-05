const express = require('express');

const User = require('./../models/user');

let router = express.Router();

router.get('/:username', (req, res, next) => {
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
        });
    });
});

module.exports = router;