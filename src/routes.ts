import { Application, Request, Response, NextFunction } from "express-serve-static-core";
import zipcode from './routes/zipcode-forecast';
import seed from './routes/seed';
import proExpress from './routes/pro-express';

const setupRoutes = (app: Application) => {

  // -- app routes start --
  app.get('/', (req: Request, res: Response) => {
    res.render('index');
  });
  app.use('/zipcode-forecast', zipcode);
  app.use('/seed', seed);
  app.use('/pro-express', proExpress);
  // -- app routes end --

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
};

export default setupRoutes;
