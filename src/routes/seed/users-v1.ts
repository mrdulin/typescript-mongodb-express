import * as express from 'express';
import * as core from "express-serve-static-core";

const router: core.Router = express.Router();

router.get('/users', function (req: core.Request, res: core.Response, next: core.NextFunction) {
  res.send('respond with a resource');
});

export default router;
