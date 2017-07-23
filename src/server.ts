import * as express from 'express';
import * as core from "express-serve-static-core";
import * as http from 'http';
import { Port } from './helpers/normalizePort';
import setupEnvironment from './environment'
import setupRoutes from './routes';

const debug = require('debug')('express-api:server');

global.__base = __dirname + '/';
const app: core.Express = express();
setupEnvironment(app, express);
setupRoutes(app);

const port: Port = app.get('port');

// var db = require(__base + 'db');
// require(__base + 'mongoose-connect');

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
