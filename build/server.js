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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 2 */
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
var http = __webpack_require__(/*! http */ 3);
var environment_1 = __webpack_require__(/*! ./environment */ 4);
var routes_1 = __webpack_require__(/*! ./routes */ 20);
var db_1 = __webpack_require__(/*! ./db */ 35);
global.__base = __dirname + '/';
var app = express();
environment_1.default(app, express);
var port = app.get('port');
var server = http.createServer(app);
db_1.default.connect(function (err, db) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    }
    app.use(function (req, res, next) {
        res.locals.db = db;
        next();
    });
    routes_1.default(app);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
});
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
/* 3 */
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 4 */
/*!****************************!*\
  !*** ./src/environment.ts ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var path = __webpack_require__(/*! path */ 5);
var Ejs = __webpack_require__(/*! ejs */ 6);
var morgan = __webpack_require__(/*! morgan */ 7);
var normalizePort_1 = __webpack_require__(/*! ./helpers/normalizePort */ 8);
var cookieParser = __webpack_require__(/*! cookie-parser */ 9);
var bodyParser = __webpack_require__(/*! body-parser */ 10);
var favicon = __webpack_require__(/*! serve-favicon */ 11);
var middlewares_1 = __webpack_require__(/*! ./middlewares */ 12);
var pkg = __webpack_require__(/*! ../package.json */ 19);
var DEFAULT_PORT = '2222';
var setupEnvironment = function (app, express) {
    var staticDir = path.resolve(process.cwd(), 'build/public');
    var libDir = path.resolve(process.cwd(), 'node_modules');
    var viewsDir = path.resolve(process.cwd(), 'build/views');
    var uploadDir = path.resolve(process.cwd(), 'build/upload');
    var port = normalizePort_1.default(process.env.PORT || DEFAULT_PORT);
    var entries = [];
    app.locals.entries = entries;
    app.use(favicon(path.resolve(process.cwd(), 'build/public/favicon.jpeg')));
    app.use('/app', express.static(staticDir));
    app.use('/lib', express.static(libDir));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(middlewares_1.default(pkg.name));
    app.locals.contants = {
        appVersion: pkg.version
    };
    app.set('port', port);
    app.set('views', viewsDir);
    app.set('upload', uploadDir);
    app.set('view engine', 'ejs');
    app.engine('ejs', Ejs.renderFile);
};
exports.default = setupEnvironment;


/***/ }),
/* 5 */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),
/* 7 */
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 8 */
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
/* 9 */
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 10 */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 11 */
/*!********************************!*\
  !*** external "serve-favicon" ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 12 */
/*!**********************************!*\
  !*** ./src/middlewares/index.ts ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = __webpack_require__(/*! ./date */ 13);
var pagination_1 = __webpack_require__(/*! ./pagination */ 14);
var script_1 = __webpack_require__(/*! ./script */ 17);
var link_1 = __webpack_require__(/*! ./link */ 18);
function helpers(name) {
    return function (req, res, next) {
        res.locals.appName = name || 'App';
        res.locals.title = name || 'App';
        res.locals.req = req;
        res.locals.isActive = link_1.isActive;
        res.locals.formatDate = date_1.formatDate;
        res.locals.formatDatetime = date_1.formatDatetime;
        res.locals.stripScript = script_1.stripScript;
        res.locals.createPagination = pagination_1.createPagination(req);
        next();
    };
}
exports.default = helpers;


/***/ }),
/* 13 */
/*!*********************************!*\
  !*** ./src/middlewares/date.ts ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function formatDate(date) {
    var dateFormatted = new Date(date);
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[dateFormatted.getMonth()] + ' ' + dateFormatted.getDate() + ', ' + dateFormatted.getFullYear();
}
exports.formatDate = formatDate;
function formatDatetime(date) {
    var dateFormatted = new Date(date);
    var hour = dateFormatted.getHours();
    var minutes = dateFormatted.getMinutes() < 10
        ? '0' + dateFormatted.getMinutes().toString()
        : dateFormatted.getMinutes();
    return formatDate(date) + ' ' + hour + ':' + minutes;
}
exports.formatDatetime = formatDatetime;


/***/ }),
/* 14 */
/*!***************************************!*\
  !*** ./src/middlewares/pagination.ts ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var url = __webpack_require__(/*! url */ 15);
var qs = __webpack_require__(/*! querystring */ 16);
function createPagination(req) {
    return function (pages, page) {
        var params = qs.parse(url.parse(req.url).query);
        var str = '';
        params.page = 1;
        var clas = page === 1 ? "active" : "no";
        for (var p = 1; p <= pages; p++) {
            params.page = p;
            clas = page === p ? "active" : "no";
            var href = '?' + qs.stringify(params);
            str += '<li class="' + clas + '"><a href="' + href + '">' + p + '</a></li>';
        }
        return str;
    };
}
exports.createPagination = createPagination;


/***/ }),
/* 15 */
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 16 */
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 17 */
/*!***********************************!*\
  !*** ./src/middlewares/script.ts ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function stripScript(str) {
    return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}
exports.stripScript = stripScript;


/***/ }),
/* 18 */
/*!*********************************!*\
  !*** ./src/middlewares/link.ts ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isActive(req, link) {
    if (link === '/') {
        return req.url === '/' ? 'active' : '';
    }
    else {
        return req.url.indexOf(link) !== -1 ? 'active' : '';
    }
}
exports.isActive = isActive;


/***/ }),
/* 19 */
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {"name":"typescript-mongodb-express","version":"1.0.0","description":"typescript mongodb express node starter","main":"index.js","scripts":{"build":"rm -rf build && webpack -w --progress","start":"npm run build && nodemon ./build/server.js"},"keywords":["typescript","mongodb","mongoose","express","nodejs"],"author":"","license":"ISC","dependencies":{"bcrypt-nodejs":"0.0.3","body-parser":"^1.15.0","bootstrap":"^3.3.7","connect-flash":"^0.1.1","cookie-parser":"^1.4.3","ejs":"^2.4.1","express":"^4.15.3","express-session":"^1.13.0","forecastio":"^1.0.2","jquery":"^3.2.1","mongodb":"^2.2.11","mongoose":"^4.4.11","morgan":"^1.7.0","passport":"^0.3.2","passport-local":"^1.0.0","serve-favicon":"~2.3.0","validator":"^6.1.0","zippity-do-dah":"^0.0.3"},"devDependencies":{"@types/body-parser":"^1.16.4","@types/chance":"^0.7.33","@types/cookie-parser":"^1.3.30","@types/copy-webpack-plugin":"^4.0.0","@types/ejs":"^2.3.33","@types/express":"^4.0.36","@types/mongodb":"^2.2.7","@types/morgan":"^1.7.32","@types/node":"^8.0.14","@types/serve-favicon":"^2.2.28","@types/webpack":"^3.0.5","chance":"^1.0.10","copy-webpack-plugin":"^4.0.1","nodemon":"^1.11.0","ts-loader":"^2.3.1","ts-node":"^3.2.1","tslint":"^5.5.0","typescript":"^2.4.2","webpack":"^3.3.0","webpack-node-externals":"^1.6.0"}}

/***/ }),
/* 20 */
/*!***********************!*\
  !*** ./src/routes.ts ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zipcode_forecast_1 = __webpack_require__(/*! ./routes/zipcode-forecast */ 21);
var seed_1 = __webpack_require__(/*! ./routes/seed */ 24);
var pro_express_1 = __webpack_require__(/*! ./routes/pro-express */ 27);
var pagination_1 = __webpack_require__(/*! ./routes/pagination */ 28);
var guest_book_1 = __webpack_require__(/*! ./routes/guest-book */ 31);
var daily_english_1 = __webpack_require__(/*! ./routes/daily-english */ 32);
var static_file_1 = __webpack_require__(/*! ./routes/static-file */ 36);
var setupRoutes = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });
    app.use('/zipcode-forecast', zipcode_forecast_1.default);
    app.use('/seed', seed_1.default);
    app.use('/pro-express', pro_express_1.default);
    app.use('/pagination', pagination_1.default);
    app.use('/guest-book', guest_book_1.default);
    app.use('/daily-english', daily_english_1.default);
    app.use('/static-file', static_file_1.default);
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
/* 21 */
/*!**********************************************!*\
  !*** ./src/routes/zipcode-forecast/index.ts ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var ForecastIo = __webpack_require__(/*! forecastio */ 22);
var zipdb = __webpack_require__(/*! zippity-do-dah */ 23);
var router = express.Router();
var apiKey = '3df89f5a467bec0e45f61829971072b2';
var forecastIo = new ForecastIo(apiKey, {
    timeout: 10 * 1000
});
router
    .get('/', function (req, res) {
    var date = res.locals.formatDate('2017-07-23');
    console.log(res.locals.formatDate);
    res.render('./zipcode-forecast', {
        date: date
    });
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
/* 22 */
/*!*****************************!*\
  !*** external "forecastio" ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("forecastio");

/***/ }),
/* 23 */
/*!*********************************!*\
  !*** external "zippity-do-dah" ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("zippity-do-dah");

/***/ }),
/* 24 */
/*!**********************************!*\
  !*** ./src/routes/seed/index.ts ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var users_v1_1 = __webpack_require__(/*! ./users-v1 */ 25);
var users_v2_1 = __webpack_require__(/*! ./users-v2 */ 26);
var router = express.Router();
function sum(arr) {
    var result = 0;
    for (var i = 0; i < arr.length; i++) {
        result += arr[i];
    }
    return result;
}
router
    .use('/v1', users_v1_1.default)
    .use('/v2', users_v2_1.default)
    .get('/', function (req, res, next) {
    res.render('./seed/index', {
        title: 'Express',
        nums: [1, 2, 3, 4],
        sum: sum
    });
});
exports.default = router;


/***/ }),
/* 25 */
/*!*************************************!*\
  !*** ./src/routes/seed/users-v1.ts ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var router = express.Router();
router.get('/users', function (req, res, next) {
    res.send('respond with a resource');
});
exports.default = router;


/***/ }),
/* 26 */
/*!*************************************!*\
  !*** ./src/routes/seed/users-v2.ts ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var router = express.Router();
router.get('/users', function (req, res) {
    res.send('This is users api version 2');
});
exports.default = router;


/***/ }),
/* 27 */
/*!*****************************************!*\
  !*** ./src/routes/pro-express/index.ts ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var router = express.Router();
router
    .get('/', function (req, res) {
    res.render('./pro-express/index');
})
    .all('/user/:id', function checkUserId(req, res, next) {
    var id = Number.parseInt(req.params.id, 10);
    !isNaN(id) ? next() : res.status(500).send('user id is not a number');
}, function processUserId(req, res) {
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
    .get('/sendjson', function (req, res) {
    var json = {
        name: 'dulin',
        age: 23
    };
    res.status(200).send(json);
});
exports.default = router;


/***/ }),
/* 28 */
/*!****************************************!*\
  !*** ./src/routes/pagination/index.ts ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var router = express.Router();
var students_1 = __webpack_require__(/*! ../../models/pagination/students */ 29);
router
    .get('/', function (req, res, next) {
    var db = res.locals.db;
    console.log(db);
    var studentCollection = new students_1.default(db);
    var total = 80;
    var pageSize = 8;
    var pageCount = total / pageSize;
    var currentPage = 1;
    var students = [];
    var studentsArrays = [];
    var studentsList = [];
    for (var i = 1; i < total; i++) {
        students.push({ name: 'Student Number ' + i });
    }
    while (students.length > 0) {
        studentsArrays.push(students.splice(0, pageSize));
    }
    if (typeof req.query.page !== 'undefined') {
        currentPage = Number.parseInt(req.query.page, 10);
    }
    studentsList = studentsArrays[+currentPage - 1];
    studentCollection.create(function (err, data) {
    });
    res.render('./pagination/index', {
        students: studentsList,
        pageSize: pageSize,
        total: total,
        pageCount: pageCount,
        currentPage: currentPage
    });
})
    .get('/students', function (req, res, next) {
    var page = Number.parseInt(req.query.page, 10) || 1;
    var pageSize = Number.parseInt(req.query.pageSize, 10) || 10;
    var db = res.locals.db;
    var studentCollection = new students_1.default(db);
    studentCollection.query(page, pageSize, function (err, data) {
        if (err)
            next(err);
        res.render('./pagination/index', {
            students: data.students,
            currentPage: page,
            total: data.total,
            pageSize: pageSize,
            pageCount: data.total / pageSize
        });
    });
});
exports.default = router;


/***/ }),
/* 29 */
/*!*******************************************!*\
  !*** ./src/models/pagination/students.ts ***!
  \*******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Chance = __webpack_require__(/*! chance */ 30);
var chance = new Chance();
var Students = (function () {
    function Students(db) {
        this.db = db;
        if (Students.instance) {
            return Students.instance;
        }
        this.db = db;
        Students.instance = this;
    }
    Students.prototype.create = function (cb) {
        var collection = this.db.collection('students');
        var students = [];
        for (var i = 0; i < 100; i++) {
            var student = {
                name: chance.name()
            };
            students.push(student);
        }
        collection.insertMany(students, function (err, result) {
            if (err)
                return cb(err);
            console.log('Insert many documents into the <students> collection');
            cb(null, { students: result });
        });
    };
    Students.prototype.query = function (page, pageSize, cb) {
        var collection = this.db.collection('students');
        collection.count({}, function (err, total) {
            if (err)
                return cb(err);
            collection.find({})
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .toArray(function (error, result) {
                if (error)
                    cb(error);
                console.log('Query documents from <students> collection');
                cb(null, {
                    students: result,
                    total: total
                });
            });
        });
    };
    return Students;
}());
exports.default = Students;


/***/ }),
/* 30 */
/*!*************************!*\
  !*** external "chance" ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("chance");

/***/ }),
/* 31 */
/*!****************************************!*\
  !*** ./src/routes/guest-book/index.ts ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var router = express.Router();
var viewPath = './guest-book/';
router
    .get('/', function (req, res) {
    res.render(viewPath + 'index');
});
router
    .route('/new-entry')
    .get(function (req, res) {
    res.render(viewPath + 'new-entry');
})
    .post(function (req, res) {
    var entries = req.app.locals.entries;
    if (!req.body.title || !req.body.content) {
        res.status(400).send('Entry must have a title and a body !');
        return;
    }
    entries.push({
        title: req.body.title,
        content: req.body.content,
        published: new Date()
    });
    res.redirect('/guest-book');
});
exports.default = router;


/***/ }),
/* 32 */
/*!*******************************************!*\
  !*** ./src/routes/daily-english/index.ts ***!
  \*******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var Sentence_1 = __webpack_require__(/*! ../../models/daily-english/Sentence */ 33);
var sentence_1 = __webpack_require__(/*! ./sentence */ 34);
var router = express.Router();
router.use(function (req, res, next) {
    var db = res.locals.db;
    res.locals.sentence = new Sentence_1.default(db);
    next();
});
router.use('/sentence', sentence_1.default);
router.get('/', function (req, res, next) {
    res.locals.sentence.all().then(function (sentences) {
        res.render('daily-english/index', { sentences: sentences });
    }).catch(function (err) { return next(err); });
});
exports.default = router;


/***/ }),
/* 33 */
/*!**********************************************!*\
  !*** ./src/models/daily-english/Sentence.ts ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = __webpack_require__(/*! mongodb */ 1);
var Sentence = (function () {
    function Sentence(db) {
        this.db = db;
        this.db = db;
        this.col = this.db.collection('sentence');
    }
    Sentence.prototype.create = function (data) {
        return this.col.insertOne(data)
            .then(function (result) {
            console.log('Insert a document into the collection');
            return result;
        });
    };
    Sentence.prototype.remove = function (id) {
        return this.col.deleteOne({ _id: new mongodb_1.ObjectID(id) }).then(function (result) {
            console.log('Delete a document from the collection');
            return result;
        });
    };
    Sentence.prototype.deleteAll = function () {
        return this.col.deleteMany({}).then(function (result) {
            console.log('Delete all documents from the collection, total: %s', result.deletedCount);
            return result;
        });
    };
    Sentence.prototype.all = function () {
        return this.col.find().toArray().then(function (result) {
            console.log("Found the following records");
            return result;
        });
    };
    return Sentence;
}());
exports.default = Sentence;


/***/ }),
/* 34 */
/*!**********************************************!*\
  !*** ./src/routes/daily-english/sentence.ts ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var router = express.Router();
router
    .post('/create', function (req, res, next) {
    var _a = req.body, enText = _a.enText, cnText = _a.cnText;
    res.locals.sentence.create({ enText: enText, cnText: cnText })
        .then(function (result) {
        res.redirect('/daily-english');
    })
        .catch(function (err) { return next(err); });
})
    .post('/remove', function (req, res, next) {
    var id = req.body.id;
    res.locals.sentence.remove(id).then(function (result) {
        var redirectUrl = req.get('referer') || '/daily-english';
        res.status(200).json({
            redirectUrl: redirectUrl,
            msg: '删除成功'
        });
    }).catch(function (err) { return next(err); });
})
    .post('/deleteAll', function (req, res, next) {
    res.locals.sentence.deleteAll().then(function (result) {
        res.redirect('/daily-english');
    }).catch(function (err) { return next(err); });
});
exports.default = router;


/***/ }),
/* 35 */
/*!*******************!*\
  !*** ./src/db.ts ***!
  \*******************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = __webpack_require__(/*! mongodb */ 1);
var Database = (function () {
    function Database(mongoClient) {
        this.mongoClient = mongoClient;
        if (Database.instance) {
            return Database.instance;
        }
        Database.instance = this;
    }
    Database.prototype.connect = function (done) {
        var _this = this;
        if (this.db)
            return done(null, this.db);
        this.mongoClient.connect(Database.url, function (err, db) {
            if (err)
                return done(err);
            console.log("Connected successfully to server");
            _this.db = db;
            done(null, db);
        });
    };
    Database.prototype.close = function (done) {
        if (this.db) {
            this.db.close(function (err, result) {
                done(err);
            });
        }
    };
    Database.prototype.get = function () {
        return this.db;
    };
    Database.url = 'mongodb://localhost:27017/typescript-mongodb-express';
    return Database;
}());
exports.default = new Database(mongodb_1.MongoClient);


/***/ }),
/* 36 */
/*!*****************************************!*\
  !*** ./src/routes/static-file/index.ts ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var path = __webpack_require__(/*! path */ 5);
var router = express.Router();
router.use(logger);
router
    .get('/', function (req, res) {
    res.render('./static-file/index');
})
    .get('/queryFile', function (req, res) {
    var root = path.resolve(process.cwd(), 'build/public/static-file/');
    console.log(root);
    var options = {
        root: root,
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
        }
        else {
            console.log('Sent:', fileName);
        }
    });
});
function logger(req, res, next) {
    console.log('Request IP: ' + req.ip);
    console.log('Request date: ' + new Date());
    next();
}
exports.default = router;


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map