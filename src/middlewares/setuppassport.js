/**
 * Created by Administrator on 2016/4/8.
 */
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require(__base + "models/sign-login-flow/user");

passport.use("login", new LocalStrategy(
    function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false,
                    {message: "No user has that username!"});
            }
            user.checkPassword(password, function (err, isMatch) {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false,
                        {message: "Invalid password."});
                }
            });
        });
    }));

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
