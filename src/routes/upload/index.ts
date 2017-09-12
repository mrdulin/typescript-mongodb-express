import * as express from 'express';
import { Application, Request, Response, NextFunction, Router } from "express";
import * as formidable from 'formidable';
import { IncomingForm, Fields, Files, File } from 'formidable';
import * as fs from 'fs';
import Resources from '../../models/upload/Resources';
import { InsertOneWriteOpResult, MongoError } from 'mongodb';

const router: Router = express.Router();

const deleteFolderRecursive = function (path: string) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const uploadRoute = (app: Application) => {
  const AppQiniu = app.get('AppQiniu');
  const { formUploader, uploadToken, putExtra } = AppQiniu;
  // const io: SocketIO.Server = app.get('io');
  const db = app.get('db');
  const uploadDir: string = app.get('upload');
  fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir);

  const resources: Resources = new Resources(db);

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


  router.post('/qiniu', (req: Request, res: Response, next: NextFunction) => {
    const form: IncomingForm = new formidable.IncomingForm();

    form.parse(req, (err: any, fields: Fields, files: Files) => {
      if (err) return res.json({ error: true, msg: '文件上传失败', body: err });

      const image: File = files.image;
      if (image.size && image.name) {
        const dir: string = uploadDir + '/' + Date.now();
        const filepath: string = dir + '/' + image.name;
        fs.mkdirSync(dir);
        fs.renameSync(image.path, filepath);

        formUploader.putFile(uploadToken, image.name, filepath, putExtra, (respErr: any, respBody: any, respInfo: any) => {
          if (respErr) {
            console.log(respErr);
            deleteFolderRecursive(dir);
            return res.json({ error: true, msg: '文件上传失败', body: respErr });
          }

          if (respInfo.statusCode === 200) {
            console.log(respBody);
            deleteFolderRecursive(dir);
            resources.create(respBody).then((result: InsertOneWriteOpResult) => {
              res.json({ error: false, msg: '文件上传成功', body: respBody });
            }).catch((error: MongoError) => {
              return res.json({ error: true, msg: '文件上传失败', body: error });
            });
          } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
            deleteFolderRecursive(dir);
            return res.json({ error: true, msg: '文件上传失败', body: respBody });
          }
        });
      } else {
        return res.json({ error: true, msg: '文件上传失败' });
      }
    });
  });

  return router;
};



export { uploadRoute };
