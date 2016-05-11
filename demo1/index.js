/**
 * Created by Administrator on 2016/5/11.
 */
var express = require('express');

var app = express();
var port = 3000;

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.all('/user/:id', function(req, res, next) {
    var id = req.params.id;
    if(!isNaN(Number(id))) {
        next();
    } else {
        res.status(500).send('user id is not a number');
    }
}, function(req, res) {
    var id = req.params.id;
    res.status(200);
    res.send('user id is ' + id);
});

//路由的多个处理函数执行顺序是按照顺序执行
app.get('/combo', [function(req, res, next) {
    setTimeout(function() {
        console.log('setTimeout is done');
        next();
    }, 3000);
}, function(req, res, next) {
    console.log('cb2');
    next();
}], function(req, res) {
    res.status(200).send('cb3 is done');
});

//如果没有调用res上的方法给客户端一个响应，该请求将会挂起，客户端network的调试工具中该请求的status将是pending状态
app.get('/hangrequest', function(req, res) {
    console.log('The request from client is hanging');
});

//测试res.send方法发送一个json格式的数据
app.get('/sendjson', function(req, res) {
    var json = {
        name: 'dulin',
        age: 23
    };
    res.status(200).send(json);
});

app.listen(port, function() {
    console.log('app is listening on port' + port);
});