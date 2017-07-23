/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var http = __webpack_require__(/*! http */ 2);
var environment_1 = __webpack_require__(/*! ./environment */ 3);
var routes_1 = __webpack_require__(/*! ./routes */ 11);
global.__base = __dirname + '/';
var app = express();
environment_1.default(app, express);
routes_1.default(app);
var port = app.get('port');
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 2 */
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 3 */
/*!****************************!*\
  !*** ./src/environment.ts ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var path = __webpack_require__(/*! path */ 4);
var Ejs = __webpack_require__(/*! ejs */ 5);
var morgan = __webpack_require__(/*! morgan */ 6);
var normalizePort_1 = __webpack_require__(/*! ./helpers/normalizePort */ 7);
var cookieParser = __webpack_require__(/*! cookie-parser */ 8);
var bodyParser = __webpack_require__(/*! body-parser */ 9);
var favicon = __webpack_require__(/*! serve-favicon */ 10);
var DEFAULT_PORT = '2222';
var setupEnvironment = function (app, express) {
    var staticDir = path.resolve(process.cwd(), 'build/public');
    var viewsDir = path.resolve(process.cwd(), 'build/views');
    var uploadDir = path.resolve(process.cwd(), 'build/upload');
    var port = normalizePort_1.default(process.env.PORT || DEFAULT_PORT);
    app.use(favicon(path.resolve(process.cwd(), 'build/public/favicon.jpeg')));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.set('port', port);
    app.set('views', viewsDir);
    app.set('upload', uploadDir);
    app.set('view engine', 'ejs');
    app.engine('ejs', Ejs.renderFile);
    app.use(express.static(staticDir));
    app.use(morgan('dev'));
};
exports.default = setupEnvironment;


/***/ }),
/* 4 */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),
/* 6 */
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 7 */
/*!**************************************!*\
  !*** ./src/helpers/normalizePort.ts ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
exports.default = normalizePort;


/***/ }),
/* 8 */
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 9 */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 10 */
/*!********************************!*\
  !*** external "serve-favicon" ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 11 */
/*!***********************!*\
  !*** ./src/routes.ts ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zipcode_forecast_1 = __webpack_require__(/*! ./routes/zipcode-forecast */ 12);
var setupRoutes = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });
    app.use('/zipcode-forecast', zipcode_forecast_1.default);
    app.use(function errorHandler(err, req, res, next) {
        res.status(err.status || 500);
        if (app.get('env') !== 'production') {
            console.log(err.message + '/n' + err.status + '/n' + err.stack);
        }
        res.render('error', {
            message: err.message,
            error: err
        });
    });
};
exports.default = setupRoutes;


/***/ }),
/* 12 */
/*!**********************************************!*\
  !*** ./src/routes/zipcode-forecast/index.ts ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var ForecastIo = __webpack_require__(/*! forecastio */ 13);
var zipdb = __webpack_require__(/*! zippity-do-dah */ 14);
var router = express.Router();
var apiKey = '3df89f5a467bec0e45f61829971072b2';
var forecastIo = new ForecastIo(apiKey, {
    timeout: 10 * 1000
});
router
    .get('/', function (req, res) {
    res.render('./zipcode-forecast');
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
        next(err);
    });
});
exports.default = router;


/***/ }),
/* 13 */
/*!*****************************!*\
  !*** external "forecastio" ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("forecastio");

/***/ }),
/* 14 */
/*!*********************************!*\
  !*** external "zippity-do-dah" ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("zippity-do-dah");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map