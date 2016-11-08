var express = require('express'),
    router = express.Router(),
    passport = require('passport');

router
    .route('/')
    .get(function(req, res, next) {
         res.render('signup');
    })
    .post(function (req, res, next) {
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
    }))