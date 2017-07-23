import { Application, Request, Response } from "express-serve-static-core";

// import zipcode from './controllers/zipcode-forecast';

const setupRoutes = (app: Application) => {
  //curl -X http://localhost:3000/v1/users
  //curl -X http://localhost:3000/v2/users
  // app.use('/v1/users', require(__base + 'controllers/seed/users-v1'));
  // app.use('/v2/users', require(__base + 'controllers/seed/users-v2'));

  // app.use('/zipcode-forecast', zipcode);

  app.get('/', (req: Request, res: Response) => {
    res.render('index');
  });
};

export default setupRoutes;
