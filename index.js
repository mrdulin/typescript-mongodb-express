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
app.set('port', process.env.PORT || 3000);

var entries = [];
app.locals.entries = entries;

app.get('/', function(req, res) {
    res.render('index');
});

app.use('/zipcode-forecast', require('./routers/zipcode-forecast'));
app.use('/static-file', require('./routers/static-file'));
app.use('/guest-book', require('./routers/guest-book'));

app.use(notFound);

function notFound(req, res, next) {
    res.status(404).render('404');
}

app.listen(app.get('port'), function() {
    console.log('App listen on port ' + app.get('port'));
});
