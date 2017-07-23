var express = require('express');
var router = express.Router();
var morgan = require('morgan');
var path = require('path');

// app.use(morgan('short'));

router.use(logger);

router
  .get('/', function (req, res) {
    res.render('./static-file/index');
  })
  .get('/queryFile', function (req, res) {

    var options = {
      root: path.resolve(__dirname, '../../public/static-file/'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

    var fileName = req.query.name;

    res.sendFile(fileName, options, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      } else {
        console.log('Sent:', fileName);
      }
    });

  })

function logger(req, res, next) {
  console.log('Request IP: ' + req.ip);
  console.log('Request date: ' + new Date());
  next();
}

module.exports = router;
