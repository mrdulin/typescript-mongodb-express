import * as express from 'express';
import { Router, Request, Response, NextFunction } from "express-serve-static-core";
import { Db, MongoError } from 'mongodb';
import Sentence from '../../models/daily-english/Sentence';
import sentenceRoute from './sentence';

const router: Router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  const db: Db = res.locals.db;
  res.locals.sentence = new Sentence(db);
  next();
});

router.use('/sentence', sentenceRoute);

router.get('/', (req, res) => {
  res.locals.sentence.all((err: MongoError, sentences: any) => {
    res.render('daily-english/index', { sentences });
  });
});

export default router;
