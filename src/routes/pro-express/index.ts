import * as express from 'express';
import { Request, Response, NextFunction, Router } from "express-serve-static-core";
const router: Router = express.Router();

router
  .get('/', function (req: Request, res: Response) {
    res.render('./pro-express/index');
  })

  /**
   * 测试同一个路由多个处理函数
   * 下面例子，如果检查用户id通过，则调用next()，将控制权交给processUserId函数
   * 否则，返回错误码500
   */
  .all('/user/:id', function checkUserId(req: Request, res: Response, next: NextFunction) {
    const id = Number.parseInt(req.params.id, 10);

    !isNaN(id) ? next() : res.status(500).send('user id is not a number');

  }, function processUserId(req, res) {
    const id = req.params.id;
    res.status(200).send('user id is ' + id);
  })

  /**
   * 测试同一个路由多个处理函数
   */
  .get('/combo', [function (req: Request, res: Response, next: NextFunction) {
    setTimeout(function () {
      console.log('setTimeout is done');
      next();
    }, 3000);
  }, function (req: Request, res: Response, next: NextFunction) {
    console.log('cb2');
    next();
  }], function (req: Request, res: Response) {
    res.status(200).send('cb3 is done');
  })

  /**
   * 测试当服务器端对请求无操作时，客户端挂起状态
   */
  .get('/hangrequest', function (req: Request, res: Response) {
    console.log('The request from client is hanging');
  })

  /**
   * 测试res.send方法发送一个json格式的数据
   */
  .get('/sendjson', function (req: Request, res: Response) {
    const json = {
      name: 'dulin',
      age: 23
    };
    res.status(200).send(json);
  });

export default router;
