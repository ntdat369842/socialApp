const express = require('express');
const passport = require('passport');

const User = require('./../models/user');

let router = express.Router();

router.get('/', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;