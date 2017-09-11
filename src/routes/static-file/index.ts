import * as express from 'express';
import { Request, Response, NextFunction, Router } from "express";
import * as path from 'path';
const router: Router = express.Router();

router.use(logger);

router
  .get('/', function (req: Request, res: Response) {
    res.render('./static-file/index');
  })
  .get('/queryFile', function (req: Request, res: Response) {

    const root: string = path.resolve(process.cwd(), 'build/public/static-file/');
    console.log(root);
    const options = {
      root,
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

    const fileName: string = req.query.name;

    res.sendFile(fileName, options, function (err: any) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      } else {
        console.log('Sent:', fileName);
      }
    });

  });

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request IP: ' + req.ip);
  console.log('Request date: ' + new Date());
  next();
}

export default router;
