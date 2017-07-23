var express = require('express');
var router = express.Router();
var ForecastIo = require('forecastio');
var zipdb = require('zippity-do-dah');

var apiKey = '3df89f5a467bec0e45f61829971072b2';
var forecastIo = new ForecastIo(apiKey);

router
  .get('/', function (req, res) {
    res.render('./zipcode-forecast/index');
  })
  .get(/^\/(\d{5})$/, function (req, res, next) {
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if (!location.zipcode) {
      res.json({
        err_no: 1,
        msg: 'can\'t find location'
      });
      return;
    }

    var latitude = location.latitude;
    var longitude = location.longitude;

    forecastIo.forecast(latitude, longitude).then(function (data) {
      res.json({
        zipcode: zipcode,
        temperature: data.currently.temperature
      });
    }, function (err) {
      next();
    });
  });

module.exports = router;
