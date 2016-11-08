var express = require('express');
var router = express.Router();
var User = require('../model/User');

var UserController = (function () {

    var ctrl = this;

    Object.assign(ctrl, {
        renderUserProfile: renderUserProfile,
        renderCreateUser: renderCreateUser,
        renderEditUser: renderEditUser,
        renderDeleteUser: renderDeleteUser,
        renderLogin: renderLogin,

        createUser: createUser,
        editUser: editUser,
        deleteUser: deleteUser,
        login: login,
        logout: logout
    });

    return ctrl;

    function renderUserProfile(req, res, next) {
        var user = req.cookies.user;
        var isLogined = req.cookies.logined;
        if (isLogined) {
            res.render('user_page', {
                title: user.name,
                name: user.name,
                email: user.email,
                userId: user._id
            });
        } else {
            res.redirect('/login');
        }
    }

    function renderCreateUser(req, res, next) {
        res.render('user_form', {
            title: 'Create user',
            name: '',
            email: '',
            buttonText: "Join!"
        });
    }

    function renderEditUser(req, res, next) {
        var user = req.cookies.user,
            isLogin = req.cookies.logined;
        if (isLogin) {
            res.render('user_form', {
                title: 'Edit user',
                _id: user._id,
                name: user.name,
                email: user.email,
                buttonText: 'Save'
            });
        } else {
            res.redirect('/login');
        }
    }

    function renderDeleteUser(req, res, next) {
        res.render('user_delete_form', {
            title: 'Delete account',
            username: req.cookies.user.name,
            _id: req.cookies.user._id,
            email: req.cookies.user.email
        });
    }

    function renderLogin(req, res, next) {
        res.render('login', {
            title: 'Log in'
        });
    }

    function createUser(req, res, next) {
        new User({
            name: req.body.username,
            email: req.body.email,
            modifiedOn: Date.now(),
            lastLogin: Date.now()
        }).save(function (err, user) {
                if (err) {
                    console.log('err: ' + err);
                    if (err.code === 11000) {
                        res.redirect('/user/new?exists=true');
                } else {
                        res.redirect('/?error=true');
                }
                } else {
                    console.log('user is: ' + user);
                    res.cookie('user', user);
                    res.cookie('logined', true);
                    User.update({_id: user.id}, {$set: {lastLogin: Date.now()}}, function () {
                        res.redirect('/user');
                    });
                }
            });
    }

    function editUser(req, res, next) {
        if (req.cookies.user._id) {
            User.findById(req.cookies.user._id, function (err, user) {
                if (err) {
                    console.log(err);
                    res.redirect('/user?error=finding');
                } else {
                    user.name = req.body.username;
                    user.email = req.body.email;
                    user.modifiedOn = Date.now();
                    user.save(function (err, userSaved) {
                        if (!err) {
                            console.log('User updated: ' + req.body.username);
                            res.cookie('user', userSaved);
                            res.redirect('/user');
                        }
                    });
                }
            });
        }
    }

    function deleteUser(req, res, next) {
        if (req.body._id) {
            User.findByIdAndRemove({_id: req.body._id}, function (err, user) {
                if (err) {
                    console.log(err);
                    res.redirect('/user?error=deleting');
                } else {
                    console.log('User deleted: ', user);
                    Project.remove({createdBy: user._id}, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.clearCookie('user', 'logined');
                            res.redirect('/user');
                        }
                    });
                }
            });
        }
    }

    function login(req, res, next) {
        var email = req.body.email;
        if (email) {
            User.findOne({email: email}, 'email name _id').exec(function (err, user) {
                if (err) {
                    res.redirect('/login?404=error');
                } else {
                    if (user) {
                        console.log('logined user is: ', user);
                        res.cookie('user', user);
                        res.cookie('logined', true);
                        res.redirect('/user');
                    } else {
                        res.redirect('/login?404=error');
                    }
                }
            });
        } else {
            res.redirect('/login?404=error')
        }
    }

    function logout(req, res, next) {
    }
}());

router
    .get('/', UserController.renderUserProfile);

router
    .route('/new')
    .get(UserController.renderCreateUser)
    .post(UserController.createUser)

router
    .route('/edit')
    .get(UserController.renderEditUser)
    .post(UserController.editUser)

router
    .route('/delete')
    .get(UserController.renderDeleteUser)
    .post(UserController.deleteUser)

router
    .route('/login')
    .get(UserController.renderLogin)
    .post(UserController.login)

router
    .post('/logout', UserController.logout);

module.exports = router;