import * as express from 'express';
import { Router, Request, Response } from 'express-serve-static-core';
const router: Router = express.Router();
const viewPath: string = './guest-book/';

router
  .get('/', (req: Request, res: Response) => {
    res.render(viewPath + 'index');
  });

router
  .route('/new-entry')
  .get((req: Request, res: Response) => {
    res.render(viewPath + 'new-entry');
  })

  /**
   * 将数据放进app.locals.entries中
   */
  .post((req: Request, res: Response) => {
    const entries: any[] = req.app.locals.entries;

    if (!req.body.title || !req.body.content) {
      res.status(400).send('Entry must have a title and a body !');
      return;
    }
    entries.push({
      title: req.body.title,
      content: req.body.content,
      published: new Date()
    });

    res.redirect('/guest-book');
  });

export default router;
