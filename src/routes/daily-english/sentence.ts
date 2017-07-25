import * as express from 'express';
import { Router, Request, Response, NextFunction } from "express-serve-static-core";
import { MongoError, InsertOneWriteOpResult, DeleteWriteOpResultObject } from 'mongodb';
const router: Router = express.Router();

router
  .post('/create', (req: Request, res: Response, next: NextFunction) => {
    const { enText, cnText }: { enText: string, cnText: string } = req.body;

    res.locals.sentence.create({ enText, cnText })
      .then((result: InsertOneWriteOpResult) => {
        // console.log('create result', result);
        res.redirect('/daily-english');
      })
      .catch((err: MongoError) => next(err));

  })
  .post('/remove', (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.body.id;

    res.locals.sentence.remove(id).then((result: DeleteWriteOpResultObject) => {
      const redirectUrl: string = req.get('referer') || '/daily-english';
      res.status(200).json({
        redirectUrl,
        msg: '删除成功'
      });
    }).catch((err: MongoError) => next(err));

  })

  .post('/deleteAll', (req: Request, res: Response, next: NextFunction) => {
    res.locals.sentence.deleteAll().then((result: DeleteWriteOpResultObject) => {
      res.redirect('/daily-english');
    }).catch((err: MongoError) => next(err));
  });

export default router;
