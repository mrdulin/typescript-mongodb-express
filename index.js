/**
 * Created by dul on 2016/4/6.
 */

var express = require('express');
var path = require('path');
var app = express();
var ForecastIo = require('forecastio');
var zipdb = require('zippity-do-dah');

var apiKey = '3df89f5a467bec0e45f61829971072b2';
var forecastIo = new ForecastIo(apiKey);

var static_dir = path.resolve(__dirname, 'public');
app.use(express.static(static_dir));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.get(/^\/(\d{5})$/, function(req, res, next) {
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if(!location.zipcode) {
        res.json({
            err_no: 1,
            msg: 'can\'t find location'
        });
        return;
    }

    var latitude = location.latitude;
    var longitude = location.longitude;

    forecastIo.forecast(latitude, longitude).then(function(data) {
        res.json({
            zipcode: zipcode,
            temperature: data.currently.temperature
        });
    }, function(err) {
        next();
    });
});

app.use(notFoundHandler);

function notFoundHandler(req, res, next) {
    res.status(404).render('404');
}

app.listen(3000, function() {
    console.log('App listen on port 3000');
});
