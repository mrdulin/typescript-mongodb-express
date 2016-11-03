/**
 * Created by Administrator on 2016/4/7.
 */
var express = require('express');

var api = express.Router();

// 路径/api下的所有请求都会经过此middleware
api.use(function(req, res, next) {
    var minute = new Date().getMinutes();

    if(minute % 2 === 0) {
        next();
    } else {
        res.status(401).send('Not authorized');
    }
});


api.get('/users', function(req, res) {
    res.status(200).send('Some users\' datas');
});

api.post('/user', function(req, res) {
    console.log('add some user');
});

module.exports = api;