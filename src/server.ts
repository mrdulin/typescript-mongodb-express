import * as express from 'express';
import * as core from "express-serve-static-core";
import * as http from 'http';
import { Port } from './helpers/normalizePort';
import setupEnvironment from './environment';
import setupRoutes from './routes';
import database from './db';
import { MongoError, Db } from 'mongodb';

const app: core.Express = express();
setupEnvironment(app, express);

const port: Port = app.get('port');
const server: http.Server = http.createServer(app);

database.connect((err: MongoError, db: Db) => {
  if (err) {
    console.log('连接数据库失败.');
    process.exit(1);
  }

  app.use((req: core.Request, res: core.Response, next: core.NextFunction) => {
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
