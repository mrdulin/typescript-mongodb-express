import * as express from 'express';
import * as core from "express-serve-static-core";

const router: core.Router = express.Router();

router.get('/users', function (req: core.Request, res: core.Response) {
  res.send('This is users api version 2');
});

export default router;
