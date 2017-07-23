import { Application, Request, Response, NextFunction } from "express-serve-static-core";
import * as path from 'path';
import * as ejs from 'ejs';
import * as morgan from 'morgan';
import normalizePort, { Port } from './helpers/normalizePort';
// var cookieParser = require('cookie-parser');
// var favicon = require('serve-favicon');

const setupEnvironment = (app: Application, express: any) => {
  const static_dir: string = path.resolve(process.cwd(), 'build/public');
  const views_dir: string = path.resolve(process.cwd(), 'build/views');
  const port: Port = normalizePort(process.env.PORT || '2222');

  // var entries = [];
  // app.locals.entries = entries;

  // app.use(favicon(path.join(__dirname, 'public', 'favicon.jpeg')));
  // app.use(cookieParser());

  app.set('port', port);
  app.set('views', views_dir);
  app.set('view engine', 'ejs');
  app.engine('ejs', ejs.renderFile);

  app.use(express.static(static_dir));
  app.use(morgan('dev'));

  app.use(function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 500);
    if (app.get('env') === 'development') {
      console.log(err.message + '/n' + err.status + '/n' + err.stack);
    }
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

export default setupEnvironment;
