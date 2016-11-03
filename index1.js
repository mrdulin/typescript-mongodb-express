/**
 * Created by Administrator on 2016/4/6.
 */
var express = require('express');
var path = require('path');
var fs = require('fs');
var morgan = require('morgan');

var app = express();
var static_dir = path.join(__dirname, 'static');

//third-party and built-in middleware
//app.use(morgan('short'));
//app.use(express.static(static_dir));

//my middleware
app.use(logger);
app.use(fileHandler);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, function() {
    console.log('App started on port 3000');
});

function logger(req, res, next) {
    console.log('Request IP: ' + req.ip);
    console.log('Request date: ' + new Date());
    next();
}

function fileHandler(req, res, next) {
    var filePath = path.join(__dirname, 'static', req.url);

    fs.stat(filePath, function(err, fileInfo) {
        if(err) {
            next();
            return;
        }

        if(fileInfo.isFile()) {
            res.sendFile(filePath, function(error) {
                if(error) {
                    next(new Error('Error sending file!'));
                } else {
                    console.log('File sent');
                }
            });
        } else {
            next();
        }
    });
}

function notFoundHandler(req, res, next) {
    res.status(404).send('File not found!');
}

function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send('Internal server error');
}