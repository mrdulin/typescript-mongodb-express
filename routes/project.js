var express = require('express');
var router = express.Router();
var Project = require('../model/Project');

router.get('/project/new', function (req, res, next) {
    res.render('project_form', {
        title: 'Express'
    });
});

router.post('/project/new', function (req, res, next) {

});

router.get('/project/:id', function (req, res, next) {

});

router.get('/project/edit/:id', function (req, res, next) {

});

router.post('/project/edit/:id', function (req, res, next) {

});

router.get('/project/delete/:id', function (req, res, next) {

});

router.post('/project/delete/:id', function (req, res, next) {

});

router.get('/project/byuser/:userid', function (req, res, next) {
    var userid = req.params.userid;
    if (userid) {
        Project.findByUserId(userid, function (err, projects) {
            if (!err) {
                console.log(projects);
                res.json(projects);
            } else {
                console.log(err);
                res.json({status: 'error', error: 'Error finding projects'});
            }
        });
    } else {
        console.log('No user id supplied');
        res.json({status: 'error', error: 'No user id supplied'});
    }
});

module.exports = router;
