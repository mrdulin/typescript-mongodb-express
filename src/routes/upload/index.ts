import * as express from 'express';
import { Application, Request, Response, NextFunction, Router } from "express";
import * as formidable from 'formidable';
import { IncomingForm, Fields, Files, File } from 'formidable';
import * as fs from 'fs';

const router: Router = express.Router();

const uploadRoute = (app: Application) => {

  // const io: SocketIO.Server = app.get('io');
  const uploadDir: string = app.get('upload');
  fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir);

  // io.on('connection', (socket: SocketIO.Socket) => {
    // socket.join('');
  // });

  router.get('/', (req: Request, res: Response) => {
    res.render('upload');
  });

  router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const form: IncomingForm = new formidable.IncomingForm();
    form.multiples = true;

    form.parse(req, (err: any, fields: Fields, files: Files) => {
      if (err) {
        req.flash('error', '上传失败!');
        return res.redirect(303, '/upload');
      }

      const image: File = files.image;
      if (image.size) {
        const dir: string = uploadDir + '/' + Date.now();
        const filepath: string = dir + '/' + image.name;
        fs.mkdirSync(dir);
        fs.renameSync(image.path, filepath);
        req.flash('success', '上传成功!');
      }
      console.log('fields: ', fields);

      res.redirect(303, '/upload');
    });

    // form.on('progress', (bytesReceived, bytesExpected) => {
    //   console.log(bytesReceived, bytesExpected);
    // });
  });

  return router;
};

export { uploadRoute };
