/**
 * Created by dul on 2016/4/6.
 */

global.__base = __dirname + '/';

var express = require('express');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');

var db = require(__base + 'db');

var static_dir = path.resolve(__dirname, 'public');
app.use(express.static(static_dir));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.jpeg')));
app.use(cookieParser());

var entries = [];
app.locals.entries = entries;

app.get('/', function (req, res) {
  res.render('index');
});

void function setupController(app) {
  [
    'zipcode-forecast',
    'static-file',
    'guest-book',
    'pro-express',
    'seed',
    'mongodb-nodejs-driver'
  ].map(function (controllerName) {
    app.use('/' + controllerName, require(__base + 'controllers/' + controllerName));
  })
} (app);

//curl -X http://localhost:3000/v1/users
//curl -X http://localhost:3000/v2/users
app.use('/v1/users', require(__base + 'controllers/seed/users-v1'));
app.use('/v2/users', require(__base + 'controllers/seed/users-v2'));


app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Connect to Mongo on start
db.connect('mongodb://localhost:27017/TrainingMEN', function (err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(app.get('port'), function () {
      console.log('App listen on port ' + app.get('port'));
    });
  }
})


