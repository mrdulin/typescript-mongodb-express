import { Application } from "express-serve-static-core";
import * as path from 'path';
import * as Ejs from 'ejs';
import * as morgan from 'morgan';
import normalizePort, { Port } from './utils/normalizePort';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as favicon from 'serve-favicon';
import viewHelperMiddleware from './middlewares';
const pkg = require('../package.json');

const DEFAULT_PORT: string = '2222';

const setupEnvironment = (app: Application, express: any) => {
  const staticDir: string = path.resolve(process.cwd(), 'build/public');
  const libDir: string = path.resolve(process.cwd(), 'node_modules');
  // TODO: 这里使用path.resolve(__dirname, './views')，会找不到视图模板文件？
  const viewsDir: string = path.resolve(process.cwd(), 'build/views');
  const uploadDir: string = path.resolve(process.cwd(), 'build/upload');
  const port: Port = normalizePort(process.env.PORT || DEFAULT_PORT);

  // -- for guest-book testing --
  const entries: any[] = [];
  app.locals.entries = entries;
  // -- --

  app.use(favicon(path.resolve(process.cwd(), 'build/public/favicon.jpeg')));
  app.use('/app', express.static(staticDir));
  app.use('/lib', express.static(libDir));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(viewHelperMiddleware(pkg.name));

  app.locals.contants = {
    appVersion: pkg.version
  };

  app.set('port', port);
  app.set('views', viewsDir);
  app.set('upload', uploadDir);
  app.set('view engine', 'ejs');
  app.engine('ejs', Ejs.renderFile);


};

export default setupEnvironment;
