var express = require('express');
var router = express.Router();
//var ejs = require('ejs');

//自定义ejs过滤器
//ejs.filters.sum = function(arr) {
//    var result = 0;
//    for(var i = 0; i < arr.length; i++) {
//        result += arr[i];
//    }
//    return result;
//};

function sum(arr) {
    var result = 0;
    for(var i = 0; i < arr.length; i++) {
        result += arr[i];
    }
    return result;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./seed/index', {
      title: 'Express',
      nums: [1,2,3,4],
      sum: sum
  });
});

module.exports = router;
