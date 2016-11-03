/**
 * Created by dul on 2016/4/6.
 */

var express = require('express');
var path = require('path');
var app = express();

var static_dir = path.resolve(__dirname, 'public');
app.use(express.static(static_dir));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.use('/zipcode-forecast', require('./routers/zipcode-forecast'));

app.use(notFoundHandler);

function notFoundHandler(req, res, next) {
    res.status(404).render('404');
}

app.listen(3000, function() {
    console.log('App listen on port 3000');
});
