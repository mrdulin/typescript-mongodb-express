var express = require('express');
var router = express.Router();
var User = require(__base + 'models/sign-login-flow/user');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
require(__base + "middlewares/setuppassport")();

mongoose.connect('mongodb://localhost:27017/test');

router.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    cookieParser(),
    session({
        secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
        resave: true,
        saveUninitialized: true
    }),
    flash(),
    passport.initialize(),
    passport.session(),
    function (req, res, next) {
        res.locals.currentUser = req.user;
        res.locals.errors = req.flash('error');
        res.locals.infos = req.flash('info');
        next();
    }
);

router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/edit', require('./edit'));

router
    .get('/', function(req, res, next) {
        User
            .find()
            .sort({createdAt: 'descending'})
            .exec(function (err, users) {
                if (err) return next(err);
                res.render('./sign-login-flow/index', {users: users});
            });
    })
    .get("/logout", function (req, res) {
        req.logout();
        res.redirect("/sign-login-flow");
    })

module.exports = router;