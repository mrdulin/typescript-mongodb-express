/**
 * Created by Administrator on 2016/4/7.
 */
var express = require('express');
var router = express.Router();
var User = require('./models/user');
var passport = require('passport');

router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error');
    res.locals.infos = req.flash('info');
    next();
});

router.get('/', function (req, res, next) {
    User
        .find()
        .sort({createdAt: 'descending'})
        .exec(function (err, users) {
            if (err) return next(err);
            res.render('index', {users: users});
        });
});

router.get('/signup', function (req, res) {
    res.render('signup');
});

router.get("/login", function (req, res) {
    res.render("login");
});

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

router.get("/edit", ensureAuthenticated, function (req, res) {
    res.render("edit");
});

router.post('/signup', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username}, function (err, user) {
        if (err) return next(err);
        if (user) {
            req.flash('error', 'User already exists');
            return res.redirect('/signup');
        }

        var newUser = new User({
            username: username,
            password: password
        });

        newUser.save(function (err, newUserSelf, numAffected) {
            if (err) return next(err);
            console.log(numAffected);
            next();
        });
    });
}, passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

router.post("/edit", ensureAuthenticated, function (req, res, next) {
    req.user.displayName = req.body.displayname;
    req.user.bio = req.body.bio;
    req.user.save(function (err) {
        if (err) {
            next(err);
            return;
        }
        req.flash("info", "Profile updated!");
        res.redirect("/edit");
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page.");
        res.redirect("/login");
    }
}

module.exports = router;