var express = require('express');
var router = express.Router();
//var ejs = require('ejs');

//custom ejs filter
//注意ejs的版本，这里用的版本不能通过下面这种形式自定义filter
//ejs.filters.sum = function(arr) {
//    var result = 0;
//    for(var i = 0; i < arr.length; i++) {
//        result += arr[i];
//    }
//    return result;
//};

//改用下面这种形式

function sum(arr) {
    var result = 0;
    for(var i = 0; i < arr.length; i++) {
        result += arr[i];
    }
    return result;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Express',
      nums: [1,2,3,4],
      sum: sum
  });
});

module.exports = router;
