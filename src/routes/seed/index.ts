import * as express from 'express';
import * as core from "express-serve-static-core";
import usersV1 from './users-v1';
import usersV2 from './users-v2';

const router: core.Router = express.Router();

//var ejs = require('ejs');

//自定义ejs过滤器
//ejs.filters.sum = function(arr) {
//    var result = 0;
//    for(var i = 0; i < arr.length; i++) {
//        result += arr[i];
//    }
//    return result;
//};

function sum(arr: number[]): number {
  let result: number = 0;
  for (let i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}

router
  //curl -X http://localhost:3000/v1/users
  //curl -X http://localhost:3000/v2/users
  .use('/v1', usersV1)
  .use('/v2', usersV2)
  .get('/', function (req, res, next) {
    res.render('./seed/index', {
      title: 'Express',
      nums: [1, 2, 3, 4],
      sum
    });
  });

export default router;
