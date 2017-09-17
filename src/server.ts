import * as express from 'express';
import { Request, Response, NextFunction, Application } from 'express';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import { Port } from './helpers/normalizePort';
// import * as socketIo from 'socket.io';
import setupEnvironment from './environment';
import setupRoutes from './routes';
import database from './db';
import { Db } from 'mongodb';

let port: Port;
const app: Application = express();
const cwd: string = process.cwd();
const options = {
  key: fs.readFileSync(path.resolve(cwd, './build/ssl/server.pem')),
  cert: fs.readFileSync(path.resolve(cwd, './build/ssl/server.crt'))
};
const server: https.Server = https.createServer(options, app);

// const io: SocketIO.Server = require('socket.io')(server);

database.connect().then((db: Db) => {

  setupEnvironment(app, express, db);
  setupRoutes(app);

  app.use(function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 500);
    if (app.get('env') !== 'production') {
      console.log(err.message + '/n' + err.status + '/n' + err.stack);
    }
    res.render('error', {
      message: err.message,
      error: err
    });
  });

  port = app.get('port');

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

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' 需要权限');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' 端口被占用');
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
  console.log('服务器已启动，监听端口： ' + bind);
}
