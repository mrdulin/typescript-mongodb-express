var express = require('express');
var router = express.Router();
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

var viewPath = './guest-book/';

router.use(
    logger('dev'),
    bodyParser.urlencoded({extended: false}),
    bodyParser.json()
);

router
    .get('/', function(req, res) {
        res.render(viewPath + 'index');
    })

router
    .route('/new-entry')
    .get(function(req, res) {
        res.render(viewPath + 'new-entry');
    })
    .post(function(req, res) {
        var entries = req.app.locals.entries;

        if(!req.body.title || !req.body.content) {
            res.status(400).send('Entry must have a title and a body !');
            return;
        }   
        entries.push({
            title: req.body.title,
            content: req.body.content,
            published: new Date()
        });

        res.redirect('/guest-book');
    })

module.exports = router;