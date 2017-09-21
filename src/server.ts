import * as express from 'express';
import { Request, Response, NextFunction, Application } from 'express';
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { Port } from './helpers/normalizePort';
import setupEnvironment from './environment';
import setupRoutes from './routes';
import database from './db';
import { Db } from 'mongodb';

const app: Application = express();
const cwd: string = process.cwd();
const options = {
  key: fs.readFileSync(path.resolve(cwd, './build/ssl/server.pem')),
  cert: fs.readFileSync(path.resolve(cwd, './build/ssl/server.crt'))
};
const httpsServer: https.Server = https.createServer(options, app);
const httpServer: http.Server = http.createServer(app);

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

  httpsServer.listen(app.get('sslPort'), 'localhost');
  httpServer.listen(app.get('port'), 'localhost');
  httpsServer.on('error', (e) => onError(e, app.get('sslPort')));
  httpServer.on('error', (e) => onError(e, app.get('port')));
  httpsServer.on('listening', () => onListening(httpsServer));
  httpServer.on('listening', () => onListening(httpServer));
});

function onError(error: any, port: Port) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' 需要权限，使用sudo命令');
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

function onListening(server: http.Server | https.Server) {
  const addr = server.address();
  console.log('服务器已启动，地址：' + addr.address + ':' + addr.port);
}
