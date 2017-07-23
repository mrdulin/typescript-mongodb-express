import { Application } from "express-serve-static-core";
import * as path from 'path';
import * as Ejs from 'ejs';
import * as morgan from 'morgan';
import normalizePort, { Port } from './helpers/normalizePort';
// var cookieParser = require('cookie-parser');
// var favicon = require('serve-favicon');

const DEFAULT_PORT: string = '2222';

const setupEnvironment = (app: Application, express: any) => {
  const staticDir: string = path.resolve(process.cwd(), 'build/public');
  const viewsDir: string = path.resolve(process.cwd(), 'build/views');
  const port: Port = normalizePort(process.env.PORT || DEFAULT_PORT);

  // var entries = [];
  // app.locals.entries = entries;

  // app.use(favicon(path.join(__dirname, 'public', 'favicon.jpeg')));
  // app.use(cookieParser());

  app.set('port', port);
  app.set('views', viewsDir);
  app.set('view engine', 'ejs');
  app.engine('ejs', Ejs.renderFile);

  app.use(express.static(staticDir));
  app.use(morgan('dev'));

};

export default setupEnvironment;
