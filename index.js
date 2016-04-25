var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

var public_dir = path.resolve(__dirname, 'public');
app.use(express.static(public_dir));

var entries = [];
app.locals.entries = entries;

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/new-entry', function(req, res) {
    res.render('new-entry');
});

app.post('/new-entry', function(req, res) {
    if(!req.body.title || !req.body.content) {
        res.status(400).send('Entry must have a title and a body !');
        return;
    }
    entries.push({
        title: req.body.title,
        content: req.body.content,
        published: new Date()
    });
    res.redirect('/');
});

app.use(function(req, res) {
    res.status(404).render('404');
});

app.listen(app.get('port'), function () {
    console.log('Example app listening on port ' + app.get('port') + '!');
});
