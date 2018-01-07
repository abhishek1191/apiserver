/**
 * Created by abhishekg on 05/01/18.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/', function(req, res, next) {
    //res.send('The server says : Hi!');
    //passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true });
});

module.exports = router;
