var express = require("express");
var router = express.Router();
var sentence = require(__base + 'models/daily-english/sentence.model');
var bodyParser = require('body-parser');
var logger = require('morgan');

router.use(
    logger('dev'),
    bodyParser.urlencoded({extended: false}),
    bodyParser.json()
);

router.use('/sentence', require('./sentence.controller'));

router.get('/', function(req, res) {
    sentence.all(function(err, result) {
        console.log(result);
        res.render('daily-english/index', {
            sentences: result
        });
    });
});

module.exports = router;