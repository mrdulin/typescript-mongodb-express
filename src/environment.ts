import { Application } from "express-serve-static-core";
import * as path from 'path';
import * as Ejs from 'ejs';
import * as morgan from 'morgan';
import normalizePort, { Port } from './helpers/normalizePort';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as favicon from 'serve-favicon';

const DEFAULT_PORT: string = '2222';

const setupEnvironment = (app: Application, express: any) => {
  const staticDir: string = path.resolve(process.cwd(), 'build/public');
  const viewsDir: string = path.resolve(process.cwd(), 'build/views');
  const uploadDir: string = path.resolve(process.cwd(), 'build/upload');
  const port: Port = normalizePort(process.env.PORT || DEFAULT_PORT);

  // var entries = [];
  // app.locals.entries = entries;

  app.use(favicon(path.resolve(process.cwd(), 'build/public/favicon.jpeg')));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.set('port', port);
  app.set('views', viewsDir);
  app.set('upload', uploadDir);
  app.set('view engine', 'ejs');
  app.engine('ejs', Ejs.renderFile);

  app.use(express.static(staticDir));
  app.use(morgan('dev'));

};

export default setupEnvironment;
