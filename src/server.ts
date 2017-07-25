import * as express from 'express';
import * as core from "express-serve-static-core";
import * as http from 'http';
import { Port } from './helpers/normalizePort';
import setupEnvironment from './environment';
import setupRoutes from './routes';
import database from './db';
import { MongoError, Db } from 'mongodb';

global.__base = __dirname + '/';
const app: core.Express = express();
setupEnvironment(app, express);

const port: Port = app.get('port');
const server: http.Server = http.createServer(app);

database.connect((err: MongoError, db: Db) => {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  }

  app.use((req: core.Request, res: core.Response, next: core.NextFunction) => {
    // console.log('db', db);
    res.locals.db = db;
    next();
  });

  setupRoutes(app);

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
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
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
