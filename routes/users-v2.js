/**
 * Created by Administrator on 2016/4/7.
 */
var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
    res.send('This is users api version 2');
});

module.exports = router;