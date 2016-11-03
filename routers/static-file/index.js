var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var fs = require('fs');

// app.use(morgan('short'));

router.use(logger, notFound, error);

router
    .get('/static-file', function(req, res) {
        var filePath = path.join(__dirname, 'static', req.url);

        console.log(filePath);

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
    })

function logger(req, res, next) {
    console.log('Request IP: ' + req.ip);
    console.log('Request date: ' + new Date());
    next();
}

function notFound(req, res, next) {
    res.status(404).send('File not found!');
}

function error(err, req, res, next) {
    console.error(err);
    res.status(500).send('Internal server error');
}

module.exports = router;