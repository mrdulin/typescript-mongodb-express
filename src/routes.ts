import { Application, Request, Response, NextFunction } from "express-serve-static-core";
import zipcode from './controllers/zipcode-forecast';

const setupRoutes = (app: Application) => {
  //curl -X http://localhost:3000/v1/users
  //curl -X http://localhost:3000/v2/users
  // app.use('/v1/users', require(__base + 'controllers/seed/users-v1'));
  // app.use('/v2/users', require(__base + 'controllers/seed/users-v2'));

  app.get('/', (req: Request, res: Response) => {
    res.render('index');
  });

  app.use('/zipcode-forecast', zipcode);

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
