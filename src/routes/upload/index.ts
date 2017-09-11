import * as express from 'express';
import { Application, Request, Response, NextFunction, Router } from "express";
import * as formidable from 'formidable';
import { IncomingForm } from 'formidable';
import * as fs from 'fs';

const router: Router = express.Router();

const uploadRoute = (app: Application) => {

  fs.existsSync(app.get('upload')) || fs.mkdirSync(app.get('upload'));

  router.get('/', (req: Request, res: Response) => {
    res.render('upload');
  });

  router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const form: IncomingForm = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {

    });
  });

  return router;
};

export { uploadRoute };
