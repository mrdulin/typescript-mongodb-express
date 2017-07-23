import * as express from 'express';
import * as path from 'path';
import * as core from "express-serve-static-core";
import * as morgan from 'morgan';
import * as http from 'http';
import * as ejs from 'ejs';

import normalizePort, { Port } from './helpers/normalizePort';

global.__base = __dirname + '/';
const app: core.Express = express();
const static_dir: string = path.resolve(__dirname, 'public');
const views_dir: string = path.resolve(__dirname, 'views');

// var cookieParser = require('cookie-parser');
// var favicon = require('serve-favicon');

// var db = require(__base + 'db');
var util = require(global.__base + 'helpers/util');
// require(__base + 'mongoose-connect');

var debug = require('debug')('express-api:server');
const port: Port = normalizePort(process.env.PORT || '2222');

app.set('port', port);
app.use(express.static(static_dir));
app.set('views', views_dir);
app.set('view engine', 'ejs');
app.engine('ejs', ejs.renderFile);

app.use(morgan('dev'));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.jpeg')));
// app.use(cookieParser());

// var entries = [];
// app.locals.entries = entries;

app.get('/', (req: core.Request, res: core.Response) => {
  res.render('index');
});

var controllers = [
  'zipcode-forecast'
  // 'static-file',
  // 'guest-book',
  // 'pro-express',
  // 'seed',
  // 'mongodb-nodejs-driver',
  // 'daily-english',
  // 'sign-login-flow',
  // 'pagination',
  // 'mongoose-pm',
  // 'movie'
]

util.setupController(controllers, app);

//curl -X http://localhost:3000/v1/users
//curl -X http://localhost:3000/v2/users
// app.use('/v1/users', require(__base + 'controllers/seed/users-v1'));
// app.use('/v2/users', require(__base + 'controllers/seed/users-v2'));

// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.use(function (err: any, req: core.Request, res: core.Response, next: core.NextFunction) {
  res.status(err.status || 500);
  if (app.get('env') === 'development') {
    console.log(err.message + '/n' + err.status + '/n' + err.stack);
  }
  res.render('error', {
    message: err.message,
    error: err
  });
});

const server: http.Server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


// // Connect to Mongo on start
// db.connect('mongodb://localhost:27017/TrainingMEN', function (err) {
// 	if (err) {
// 		console.log('Unable to connect to Mongo.')
// 		process.exit(1)
// 	} else {
// 		app.listen(app.get('port'), function () {
// 			console.log('App listen on port ' + app.get('port'));
// 		});
// 	}
// })


