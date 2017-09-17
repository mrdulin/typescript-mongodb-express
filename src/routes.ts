import { Application, Request, Response } from "express";
import zipcode from './routes/zipcode-forecast';
import seed from './routes/seed';
import proExpress from './routes/pro-express';
import pagination from './routes/pagination';
import guestBook from './routes/guest-book';
import dailyEnglish from './routes/daily-english';
import staticFile from './routes/static-file';
import { uploadRoute } from './routes/upload';
import { authFactory, IAuth } from './lib/auth';
import { config } from './config';

const setupRoutes = (app: Application) => {

  // -- app routes start --
  app.get('/', (req: Request, res: Response) => {
    res.render('index');
  });

  const auth: IAuth = authFactory(app, {
    providers: config.authProviders,
    successRedirect: '/',
    failedRedirect: '/login'
  });

  auth.init();
  auth.registerRoutes();

  app.use('/zipcode-forecast', zipcode);
  app.use('/seed', seed);
  app.use('/pro-express', proExpress);
  app.use('/pagination', pagination);
  app.use('/guest-book', guestBook);
  app.use('/daily-english', dailyEnglish);
  app.use('/static-file', staticFile);
  app.use('/upload', uploadRoute(app));
  // -- app routes end --

};

export default setupRoutes;
