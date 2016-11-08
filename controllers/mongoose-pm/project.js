var express = require('express');
var router = express.Router();
var Project = require('../model/Project');

router.get('/project/new', function (req, res, next) {
    if (req.cookies.logined) {
        res.render('project_form', {
            title: 'Create project',
            projectName: '',
            projectId: '',
            userId: req.cookies.user._id,
            username: req.cookies.user.name,
            tasks: '',
            buttonText: 'create'
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/project/new', function (req, res, next) {
    new Project({
        projectName: req.body.projectName,
        tasks: req.body.tasks,
        createdBy: req.cookies.user._id,
        modifiedOn: Date.now()
    }).save(function (err, project) {
            if (err) {
                if (err === 11000) {
                    res.redirect('/project/new?error=true');
                } else {
                    res.redirect('/?error=true');
                }
            } else {
                console.log('create project is: ', project);
                res.redirect('/user');
            }
        });
});

router.get('/project/:id', function (req, res, next) {
    if (req.params.id) {
        Project
            .findById(req.params.id)
            .populate('createdBy', 'name email')
            .exec(function (err, project) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('project is: ', project);
                    res.render('project_page', {
                        projectName: project.projectName,
                        //createdBy: project.createdBy,
                        tasks: project.tasks,
                        projectId: req.params.id,
                        username: project.createdBy.name,
                        email: project.createdBy.email
                    });
                }
            });
    } else {
        console.log('project id must be supplied');
        res.redirect('/user');
    }
});

router.get('/project/edit/:id', function (req, res, next) {
    if (req.params.id) {
        Project.findById(req.params.id, function (err, project) {
            if (err) {
                console.log(err);
            } else {
                console.log('project is: ', project);
                res.render('project_form', {
                    title: "Edit project",
                    userId: req.cookies.user._id,
                    username: req.cookies.user.name,
                    projectName: project.projectName,
                    projectId: req.params.id,
                    tasks: project.tasks,
                    buttonText: 'edit'
                });
            }
        });
    }
});

router.post('/project/edit/:id', function (req, res, next) {
    if (req.body.projectId) {
        Project.findById(req.body.projectId, function (err, project) {
            if (err) {
                console.log(err);
            } else {
                console.log('project is: ', project);
                project.projectName = req.body.projectName;
                project.tasks = req.body.tasks;
                project.modifiedOn = Date.now();
                project.save(function (err, projectSaved) {
                    if (!err) {
                        console.log('project saved success');
                        res.redirect('/project/' + projectSaved._id);
                    }
                })
            }
        });
    }
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
