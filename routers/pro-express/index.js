var express = require('express');
var router = express.Router();

router
    .get('/', function(req, res) {
        res.render('./pro-express/index');
    })
    .all('/user/:id', function (req, res, next) {
        var id = req.params.id;

        if (!isNaN(Number(id))) {
            next();
        } else {
            res.status(500).send('user id is not a number');
        }
    }, function (req, res) {
        var id = req.params.id;
        res.status(200).send('user id is ' + id);
    })
    .get('/combo', [function (req, res, next) {
        setTimeout(function () {
            console.log('setTimeout is done');
            next();
        }, 3000);
    }, function (req, res, next) {
        console.log('cb2');
        next();
    }], function (req, res) {
        res.status(200).send('cb3 is done');
    })
    .get('/hangrequest', function (req, res) {
        console.log('The request from client is hanging');
    })
    //测试res.send方法发送一个json格式的数据
    .get('/sendjson', function (req, res) {
        var json = {
            name: 'dulin',
            age: 23
        };
        res.status(200).send(json);
    })


module.exports = router;