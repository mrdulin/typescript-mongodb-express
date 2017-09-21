import * as express from 'express';
import { Application, Request, Response, NextFunction, Router } from "express";
import * as formidable from 'formidable';
import { IncomingForm, Fields, Files, File } from 'formidable';
import * as fs from 'fs';
import Resources from '../../models/upload/Resources';
import { InsertOneWriteOpResult, MongoError } from 'mongodb';
import * as request from 'request';
const qiniu = require('qiniu');

const router: Router = express.Router();

const deleteFolderRecursive = function (path: string) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const getPageCount = (total: number, pageSize: number): number => {
  return total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1;
};

const uploadRoute = (app: Application) => {
  const AppQiniu = app.get('AppQiniu');
  const { formUploader, uploadToken, putExtra } = AppQiniu;
  // const io: SocketIO.Server = app.get('io');
  const db = app.get('db');
  const uploadDir: string = app.get('upload');
  fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir);

  const resources: Resources = new Resources(db);
  const pageSize: number = 10;

  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    const page: number = Number.parseInt(req.query.page, 10);
    resources.queryByPage(page, pageSize).then((result) => {
      const { datas, count } = result;
      const pageCount: number = getPageCount(count, pageSize);
      const prevDisabledClass: string = (page - 1 <= 0) ? 'disabled' : '';
      const nextDisabledClass: string = page === pageCount ? 'disabled' : '';
      res.render('upload', { datas, count, page, pageSize, pageCount, prevDisabledClass, nextDisabledClass });
    }).catch(next);
  });

  // router.post('/', (req: Request, res: Response, next: NextFunction) => {
  //   const form: IncomingForm = new formidable.IncomingForm();
  //   form.multiples = true;

  //   form.parse(req, (err: any, fields: Fields, files: Files) => {
  //     if (err) {
  //       req.flash('error', '上传失败!');
  //       return res.redirect(303, '/upload?page=1');
  //     }

  //     const image: File = files.image;
  //     if (image.size) {
  //       const dir: string = uploadDir + '/' + Date.now();
  //       const filepath: string = dir + '/' + image.name;
  //       fs.mkdirSync(dir);
  //       fs.renameSync(image.path, filepath);
  //       req.flash('success', '上传成功!');
  //     }
  //     console.log('fields: ', fields);

  //     res.redirect(303, '/upload?page=1');
  //   });

  // form.on('progress', (bytesReceived, bytesExpected) => {
  //   console.log(bytesReceived, bytesExpected);
  // });
  // });


  router.post('/qiniu', (req: Request, res: Response, next: NextFunction) => {
    const form: IncomingForm = new formidable.IncomingForm();
    const redirectUrl: string = '/upload?page=1';

    form.parse(req, (err: any, fields: Fields, files: Files) => {
      if (err) {
        req.flash('error', '文件上传失败');
        return res.redirect(303, redirectUrl);
      }

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
            // return res.json({ error: true, msg: '文件上传失败', body: respErr });
            req.flash('error', '文件上传失败');
            return res.redirect(303, redirectUrl);
          }

          if (respInfo.statusCode === 200) {
            console.log(respBody);
            deleteFolderRecursive(dir);
            resources.create(respBody).then((result: InsertOneWriteOpResult) => {
              // res.json({ error: false, msg: '文件上传成功', body: respBody });
              req.flash('success', '文件上传成功');
              return res.redirect('back');
            }).catch((error: MongoError) => {
              req.flash('error', '文件上传失败');
              return res.redirect(303, redirectUrl);
              // return res.json({ error: true, msg: '文件上传失败', body: error });
            });
          } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
            deleteFolderRecursive(dir);
            req.flash('error', '文件上传失败');
            return res.redirect(303, redirectUrl);
            // return res.json({ error: true, msg: '文件上传失败', body: respBody });
          }
        });
      } else {
        req.flash('error', '文件上传失败');
        return res.redirect(303, redirectUrl);
        // return res.json({ error: true, msg: '文件上传失败' });
      }
    });
  });

  router.get('/qiniu/list', (req: Request, res: Response, next: NextFunction) => {
    const url: string = 'https://rsf.qbox.me/list?bucket=code';
    const accessToken: string = qiniu.util.generateAccessToken(AppQiniu.mac, url);
    const options: request.Options = {
      url,
      headers: {
        Authorization: accessToken
      }
    };

    request(options, (error, response, body) => {
      if (error) return next(error);

      if (response.statusCode === 200) {
        return res.json(JSON.parse(body));
      }
      res.json(response);
    });
  });

  return router;
};



export { uploadRoute };
