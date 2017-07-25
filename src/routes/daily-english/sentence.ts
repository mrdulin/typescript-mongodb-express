import * as express from 'express';
import { Router, Request, Response, NextFunction } from "express-serve-static-core";
import { MongoError, InsertOneWriteOpResult } from 'mongodb';
const router: Router = express.Router();

router
  .post('/create', (req: Request, res: Response, next: NextFunction) => {
    const { enText, cnText }: { enText: string, cnText: string } = req.body;

    res.locals.sentence.create({ enText, cnText })
      .then((result: InsertOneWriteOpResult) => {
        console.log('create result', result);
        res.redirect('/daily-english');
      })
      .catch((err: MongoError) => next(err));

  })
  .post('/remove', (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.body.id;

    res.locals.sentence.remove(id, function (err: MongoError, result: any) {
      if (err) next(err);
      res.status(200).json({
        redirectUrl: req.get('referer'),
        msg: '删除成功'
      });
    });

  })
  .post('/deleteAll', function (req: Request, res: Response, next: NextFunction) {
    res.locals.sentence.deleteAll(function (err: MongoError, result: any) {
      if (err) next(err);
      res.redirect('/daily-english');
    });
  });

export default router;
