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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
  !*** ./src/config.ts ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    DB_URL: 'mongodb://localhost:27017/typescript-mongodb-express',
    forecastio_key: '3df89f5a467bec0e45f61829971072b2',
    DEFAULT_PORT: '2222',
    cookieSecretKey: 'zhudinggudanyisheng'
};
exports.config = config;


/***/ }),
/* 2 */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 4 */
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var http = __webpack_require__(/*! http */ 5);
var environment_1 = __webpack_require__(/*! ./environment */ 6);
var routes_1 = __webpack_require__(/*! ./routes */ 21);
var db_1 = __webpack_require__(/*! ./db */ 40);
var app = express();
var port = app.get('port');
var server = http.createServer(app);
db_1.default.connect().then(function (db) {
    environment_1.default(app, express, db);
    routes_1.default(app);
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
            console.error(bind + ' 需要权限');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' 端口被占用');
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
    console.log('服务器已启动，监听端口： ' + bind);
}


/***/ }),
/* 5 */
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 6 */
/*!****************************!*\
  !*** ./src/environment.ts ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var path = __webpack_require__(/*! path */ 2);
var Ejs = __webpack_require__(/*! ejs */ 7);
var morgan = __webpack_require__(/*! morgan */ 8);
var bodyParser = __webpack_require__(/*! body-parser */ 11);
var favicon = __webpack_require__(/*! serve-favicon */ 12);
var flash = __webpack_require__(/*! connect-flash */ 41);
var session = __webpack_require__(/*! express-session */ 42);
var connectMongo = __webpack_require__(/*! connect-mongo */ 43);
var normalizePort_1 = __webpack_require__(/*! ./helpers/normalizePort */ 9);
var middlewares_1 = __webpack_require__(/*! ./middlewares */ 13);
var pkg = __webpack_require__(/*! ../package.json */ 20);
var config_1 = __webpack_require__(/*! ./config */ 1);
var setupEnvironment = function (app, express, db) {
    var staticDir = path.resolve(process.cwd(), 'build/public');
    var libDir = path.resolve(process.cwd(), 'node_modules');
    var viewsDir = path.resolve(process.cwd(), 'build/views');
    var uploadDir = path.resolve(process.cwd(), './upload');
    var port = normalizePort_1.default(process.env.PORT || config_1.config.DEFAULT_PORT);
    var entries = [];
    app.locals.entries = entries;
    app.locals.contants = {
        appVersion: pkg.version
    };
    app.set('db', db);
    var MongoStore = connectMongo(session);
    app.use(favicon(path.resolve(process.cwd(), 'build/public/favicon.jpeg')));
    app.use('/app', express.static(staticDir));
    app.use('/lib', express.static(libDir));
    app.use(session({
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: 60 * 1000
        },
        name: 'sid',
        resave: false,
        saveUninitialized: false,
        secret: config_1.config.cookieSecretKey,
        store: new MongoStore({
            db: db
        })
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(flash());
    app.use(middlewares_1.default(pkg.name));
    app.use(morgan('dev'));
    app.set('port', port);
    app.set('views', viewsDir);
    app.set('upload', uploadDir);
    app.set('view engine', 'ejs');
    app.engine('ejs', Ejs.renderFile);
};
exports.default = setupEnvironment;


/***/ }),
/* 7 */
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),
/* 8 */
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 9 */
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
/* 10 */,
/* 11 */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 12 */
/*!********************************!*\
  !*** external "serve-favicon" ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),
/* 13 */
/*!**********************************!*\
  !*** ./src/middlewares/index.ts ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = __webpack_require__(/*! ./date */ 14);
var pagination_1 = __webpack_require__(/*! ./pagination */ 15);
var script_1 = __webpack_require__(/*! ./script */ 18);
var link_1 = __webpack_require__(/*! ./link */ 19);
function helpers(name) {
    return function (req, res, next) {
        res.locals.isActive = link_1.isActive;
        res.locals.formatDate = date_1.formatDate;
        res.locals.formatDatetime = date_1.formatDatetime;
        res.locals.stripScript = script_1.stripScript;
        res.locals.createPagination = pagination_1.createPagination(req);
        if (typeof req.flash !== 'undefined') {
            res.locals.info = req.flash('info');
            res.locals.error = req.flash('error');
            res.locals.success = req.flash('success');
            res.locals.warning = req.flash('warning');
        }
        next();
    };
}
exports.default = helpers;


/***/ }),
/* 14 */
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
/* 15 */
/*!***************************************!*\
  !*** ./src/middlewares/pagination.ts ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var url = __webpack_require__(/*! url */ 16);
var qs = __webpack_require__(/*! querystring */ 17);
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
/* 16 */
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 17 */
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 18 */
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
/* 19 */
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
/* 20 */
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {"name":"typescript-mongodb-express","version":"1.0.0","description":"typescript mongodb express node starter","main":"index.js","scripts":{"build":"rm -rf build && webpack -w --progress","start":"nodemon ./build/server.js"},"author":"","license":"ISC","dependencies":{"body-parser":"^1.18.0","bootstrap":"^3.3.7","connect-flash":"^0.1.1","connect-mongo":"^1.3.2","ejs":"^2.5.7","express":"^4.15.4","express-session":"^1.15.5","forecastio":"^1.0.2","formidable":"^1.1.1","jquery":"^3.2.1","mongodb":"^2.2.31","morgan":"^1.7.0","serve-favicon":"~2.3.0","socket.io":"^2.0.3","zippity-do-dah":"^0.0.3"},"devDependencies":{"@types/body-parser":"^1.16.5","@types/chance":"^0.7.35","@types/connect-flash":"^0.0.33","@types/connect-mongo":"^0.0.33","@types/copy-webpack-plugin":"^4.0.1","@types/ejs":"^2.3.33","@types/express":"^4.0.37","@types/express-session":"^1.15.3","@types/formidable":"^1.0.29","@types/mongodb":"^2.2.11","@types/morgan":"^1.7.32","@types/node":"^8.0.28","@types/serve-favicon":"^2.2.29","@types/socket.io":"^1.4.30","@types/webpack":"^3.0.10","chance":"^1.0.11","copy-webpack-plugin":"^4.0.1","nodemon":"^1.12.0","ts-loader":"^2.3.7","ts-node":"^3.3.0","tslint":"^5.7.0","typescript":"^2.5.2","webpack":"^3.5.6","webpack-node-externals":"^1.6.0"}}

/***/ }),
/* 21 */
/*!***********************!*\
  !*** ./src/routes.ts ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zipcode_forecast_1 = __webpack_require__(/*! ./routes/zipcode-forecast */ 22);
var seed_1 = __webpack_require__(/*! ./routes/seed */ 25);
var pro_express_1 = __webpack_require__(/*! ./routes/pro-express */ 28);
var pagination_1 = __webpack_require__(/*! ./routes/pagination */ 29);
var guest_book_1 = __webpack_require__(/*! ./routes/guest-book */ 32);
var daily_english_1 = __webpack_require__(/*! ./routes/daily-english */ 33);
var static_file_1 = __webpack_require__(/*! ./routes/static-file */ 36);
var upload_1 = __webpack_require__(/*! ./routes/upload */ 37);
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
    app.use('/upload', upload_1.uploadRoute(app));
};
exports.default = setupRoutes;


/***/ }),
/* 22 */
/*!**********************************************!*\
  !*** ./src/routes/zipcode-forecast/index.ts ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var config_1 = __webpack_require__(/*! ../../config */ 1);
var ForecastIo = __webpack_require__(/*! forecastio */ 23);
var zipdb = __webpack_require__(/*! zippity-do-dah */ 24);
var router = express.Router();
var forecastIo = new ForecastIo(config_1.config.forecastio_key, {
    timeout: 10 * 1000
});
router
    .get('/', function (req, res) {
    var date = res.locals.formatDate('2017-07-23');
    console.log(res.locals.formatDate);
    res.render('./zipcode-forecast', { date: date });
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
    var latitude = location.latitude, longitude = location.longitude;
    forecastIo.forecast(latitude, longitude)
        .then(function (data) {
        res.json({
            zipcode: zipcode,
            temperature: data.currently.temperature
        });
    })
        .catch(next);
});
exports.default = router;


/***/ }),
/* 23 */
/*!*****************************!*\
  !*** external "forecastio" ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("forecastio");

/***/ }),
/* 24 */
/*!*********************************!*\
  !*** external "zippity-do-dah" ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("zippity-do-dah");

/***/ }),
/* 25 */
/*!**********************************!*\
  !*** ./src/routes/seed/index.ts ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var users_v1_1 = __webpack_require__(/*! ./users-v1 */ 26);
var users_v2_1 = __webpack_require__(/*! ./users-v2 */ 27);
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
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
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
var students_1 = __webpack_require__(/*! ../../models/pagination/students */ 30);
router
    .get('/', function (req, res, next) {
    var db = res.app.locals.db;
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
    var db = res.app.locals.db;
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
/* 30 */
/*!*******************************************!*\
  !*** ./src/models/pagination/students.ts ***!
  \*******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Chance = __webpack_require__(/*! chance */ 31);
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
/* 31 */
/*!*************************!*\
  !*** external "chance" ***!
  \*************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("chance");

/***/ }),
/* 32 */
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
/* 33 */
/*!*******************************************!*\
  !*** ./src/routes/daily-english/index.ts ***!
  \*******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var Sentence_1 = __webpack_require__(/*! ../../models/daily-english/Sentence */ 34);
var sentence_1 = __webpack_require__(/*! ./sentence */ 35);
var router = express.Router();
router.use(function (req, res, next) {
    var db = res.app.locals.db;
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
/* 34 */
/*!**********************************************!*\
  !*** ./src/models/daily-english/Sentence.ts ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = __webpack_require__(/*! mongodb */ 3);
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
/* 35 */
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
var path = __webpack_require__(/*! path */ 2);
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


/***/ }),
/* 37 */
/*!************************************!*\
  !*** ./src/routes/upload/index.ts ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ 0);
var formidable = __webpack_require__(/*! formidable */ 38);
var fs = __webpack_require__(/*! fs */ 39);
var router = express.Router();
var uploadRoute = function (app) {
    var uploadDir = app.get('upload');
    fs.existsSync(uploadDir) || fs.mkdirSync(uploadDir);
    router.get('/', function (req, res) {
        res.render('upload');
    });
    router.post('/', function (req, res, next) {
        var form = new formidable.IncomingForm();
        form.multiples = true;
        form.parse(req, function (err, fields, files) {
            if (err) {
                req.flash('error', '上传失败!');
                return res.redirect(303, '/upload');
            }
            var image = files.image;
            if (image.size) {
                var dir = uploadDir + '/' + Date.now();
                var filepath = dir + '/' + image.name;
                fs.mkdirSync(dir);
                fs.renameSync(image.path, filepath);
                req.flash('success', '上传成功!');
            }
            console.log('fields: ', fields);
            res.redirect(303, '/upload');
        });
    });
    return router;
};
exports.uploadRoute = uploadRoute;


/***/ }),
/* 38 */
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("formidable");

/***/ }),
/* 39 */
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 40 */
/*!*******************!*\
  !*** ./src/db.ts ***!
  \*******************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = __webpack_require__(/*! mongodb */ 3);
var config_1 = __webpack_require__(/*! ./config */ 1);
var Database = (function () {
    function Database(mongoClient) {
        this.mongoClient = mongoClient;
        if (Database.instance) {
            return Database.instance;
        }
        Database.instance = this;
    }
    Database.prototype.connect = function () {
        var _this = this;
        if (this.db)
            return Promise.resolve(this.db);
        return this.mongoClient
            .connect(Database.url)
            .then(function (db) {
            console.log("连接数据库成功。");
            _this.db = db;
            return db;
        })
            .catch(function (err) {
            console.log('连接数据库失败.', err.stack);
            process.exit(1);
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
    Database.url = config_1.config.DB_URL;
    return Database;
}());
exports.default = new Database(mongodb_1.MongoClient);


/***/ }),
/* 41 */
/*!********************************!*\
  !*** external "connect-flash" ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("connect-flash");

/***/ }),
/* 42 */
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 43 */
/*!*********************************************!*\
  !*** ./node_modules/connect-mongo/index.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src */ 44);


/***/ }),
/* 44 */
/*!*************************************************!*\
  !*** ./node_modules/connect-mongo/src/index.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint indent: [error, 4] */

const Promise = __webpack_require__(/*! bluebird */ 45);
const MongoClient = __webpack_require__(/*! mongodb */ 3);

function defaultSerializeFunction(session) {
    // Copy each property of the session to a new object
    const obj = {};
    let prop;

    for (prop in session) {
        if (prop === 'cookie') {
            // Convert the cookie instance to an object, if possible
            // This gets rid of the duplicate object under session.cookie.data property
            obj.cookie = session.cookie.toJSON ? session.cookie.toJSON() : session.cookie;
        } else {
            obj[prop] = session[prop];
        }
    }

    return obj;
}

function computeTransformFunctions(options, defaultStringify) {
    if (options.serialize || options.unserialize) {
        return {
            serialize: options.serialize || defaultSerializeFunction,
            unserialize: options.unserialize || (x => x),
        };
    }

    if (options.stringify === false || defaultStringify === false) {
        return {
            serialize: defaultSerializeFunction,
            unserialize: x => x,
        };
    }

    if (options.stringify === true || defaultStringify === true) {
        return {
            serialize: JSON.stringify,
            unserialize: JSON.parse,
        };
    }
}

module.exports = function connectMongo(connect) {
    const Store = connect.Store || connect.session.Store;
    const MemoryStore = connect.MemoryStore || connect.session.MemoryStore;

    class MongoStore extends Store {

        constructor(options) {
            options = options || {};

            /* Fallback */
            if (options.fallbackMemory && MemoryStore) {
                return new MemoryStore();
            }

            super(options);

            /* Options */
            this.ttl = options.ttl || 1209600; // 14 days
            this.collectionName = options.collection || 'sessions';
            this.autoRemove = options.autoRemove || 'native';
            this.autoRemoveInterval = options.autoRemoveInterval || 10;
            this.transformFunctions = computeTransformFunctions(options, true);

            this.options = options;

            this.changeState('init');

            const newConnectionCallback = (err, db) => {
                if (err) {
                    this.connectionFailed(err);
                } else {
                    this.handleNewConnectionAsync(db);
                }
            };

            if (options.url) {
                // New native connection using url + mongoOptions
                MongoClient.connect(options.url, options.mongoOptions || {}, newConnectionCallback);
            } else if (options.mongooseConnection) {
                // Re-use existing or upcoming mongoose connection
                if (options.mongooseConnection.readyState === 1) {
                    this.handleNewConnectionAsync(options.mongooseConnection.db);
                } else {
                    options.mongooseConnection.once('open', () => this.handleNewConnectionAsync(options.mongooseConnection.db));
                }
            } else if (options.db && options.db.listCollections) {
                // Re-use existing or upcoming native connection
                if (options.db.openCalled || options.db.openCalled === undefined) { // openCalled is undefined in mongodb@2.x
                    this.handleNewConnectionAsync(options.db);
                } else {
                    options.db.open(newConnectionCallback);
                }
            } else if (options.dbPromise) {
                options.dbPromise
                    .then(db => this.handleNewConnectionAsync(db))
                    .catch(err => this.connectionFailed(err));
            } else {
                throw new Error('Connection strategy not found');
            }

            this.changeState('connecting');

        }

        connectionFailed(err) {
            this.changeState('disconnected');
            throw err;
        }

        handleNewConnectionAsync(db) {
            this.db = db;
            return this
                .setCollection(db.collection(this.collectionName))
                .setAutoRemoveAsync()
                    .then(() => this.changeState('connected'));
        }

        setAutoRemoveAsync() {
            let removeQuery = { expires: { $lt: new Date() } };
            switch (this.autoRemove) {
            case 'native':
                return this.collection.ensureIndexAsync({ expires: 1 }, { expireAfterSeconds: 0 });
            case 'interval':
                this.timer = setInterval(() => this.collection.remove(removeQuery, { w: 0 }), this.autoRemoveInterval * 1000 * 60);
                this.timer.unref();
                return Promise.resolve();
            default:
                return Promise.resolve();
            }
        }

        changeState(newState) {
            if (newState !== this.state) {
                this.state = newState;
                this.emit(newState);
            }
        }

        setCollection(collection) {
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.collectionReadyPromise = undefined;
            this.collection = collection;

            // Promisify used collection methods
            ['count', 'findOne', 'remove', 'drop', 'ensureIndex'].forEach(method => {
                collection[method + 'Async'] = Promise.promisify(collection[method], { context: collection });
            });
            collection.updateAsync = Promise.promisify(collection.update, { context: collection, multiArgs: true });

            return this;
        }

        collectionReady() {
            let promise = this.collectionReadyPromise;
            if (!promise) {
                promise = new Promise((resolve, reject) => {
                    switch (this.state) {
                    case 'connected':
                        resolve(this.collection);
                        break;
                    case 'connecting':
                        this.once('connected', () => resolve(this.collection));
                        break;
                    case 'disconnected':
                        reject(new Error('Not connected'));
                        break;
                    }
                });
                this.collectionReadyPromise = promise;
            }
            return promise;
        }

        computeStorageId(sessionId) {
            if (this.options.transformId && typeof this.options.transformId === 'function') {
                return this.options.transformId(sessionId);
            } else {
                return sessionId;
            }
        }

        /* Public API */

        get(sid, callback) {
            return this.collectionReady()
                .then(collection => collection.findOneAsync({
                    _id: this.computeStorageId(sid),
                    $or: [
                        { expires: { $exists: false } },
                        { expires: { $gt: new Date() } },
                    ],
                }))
                .then(session => {
                    if (session) {
                        const s = this.transformFunctions.unserialize(session.session);
                        if (this.options.touchAfter > 0 && session.lastModified) {
                            s.lastModified = session.lastModified;
                        }
                        this.emit('touch', sid);
                        return s;
                    }
                })
                .asCallback(callback);
        }

        set(sid, session, callback) {

            // removing the lastModified prop from the session object before update
            if (this.options.touchAfter > 0 && session && session.lastModified) {
                delete session.lastModified;
            }

            let s;

            try {
                s = { _id: this.computeStorageId(sid), session: this.transformFunctions.serialize(session) };
            } catch (err) {
                return callback(err);
            }

            if (session && session.cookie && session.cookie.expires) {
                s.expires = new Date(session.cookie.expires);
            } else {
                // If there's no expiration date specified, it is
                // browser-session cookie or there is no cookie at all,
                // as per the connect docs.
                //
                // So we set the expiration to two-weeks from now
                // - as is common practice in the industry (e.g Django) -
                // or the default specified in the options.
                s.expires = new Date(Date.now() + this.ttl * 1000);
            }

            if (this.options.touchAfter > 0) {
                s.lastModified = new Date();
            }

            return this.collectionReady()
                .then(collection => collection.updateAsync({ _id: this.computeStorageId(sid) }, s, { upsert: true }))
                .then(responseArray => {
                    const rawResponse = responseArray.length === 2 ? responseArray[1] : responseArray[0].result;
                    if (rawResponse.upserted) {
                        this.emit('create', sid);
                    } else {
                        this.emit('update', sid);
                    }
                    this.emit('set', sid);
                })
                .asCallback(callback);
        }

        touch(sid, session, callback) {
            const updateFields = {},
                touchAfter = this.options.touchAfter * 1000,
                lastModified = session.lastModified ? session.lastModified.getTime() : 0,
                currentDate = new Date();

            // if the given options has a touchAfter property, check if the
            // current timestamp - lastModified timestamp is bigger than
            // the specified, if it's not, don't touch the session
            if (touchAfter > 0 && lastModified > 0) {

                const timeElapsed = currentDate.getTime() - session.lastModified;

                if (timeElapsed < touchAfter) {
                    return callback();
                } else {
                    updateFields.lastModified = currentDate;
                }

            }

            if (session && session.cookie && session.cookie.expires) {
                updateFields.expires = new Date(session.cookie.expires);
            } else {
                updateFields.expires = new Date(Date.now() + this.ttl * 1000);
            }

            return this.collectionReady()
                .then(collection => collection.updateAsync({ _id: this.computeStorageId(sid) }, { $set: updateFields }))
                .then(result => {
                    if (result.nModified === 0) {
                        throw new Error('Unable to find the session to touch');
                    } else {
                        this.emit('touch', sid);
                    }
                })
                .asCallback(callback);
        }

        destroy(sid, callback) {
            return this.collectionReady()
                .then(collection => collection.removeAsync({ _id: this.computeStorageId(sid) }))
                .then(() => this.emit('destroy', sid))
                .asCallback(callback);
        }

        length(callback) {
            return this.collectionReady()
                .then(collection => collection.countAsync({}))
                .asCallback(callback);
        }

        clear(callback) {
            return this.collectionReady()
                .then(collection => collection.dropAsync())
                .asCallback(callback);
        }

        close() {
            if (this.db) {
                this.db.close();
            }
        }
    }

    return MongoStore;
};


/***/ }),
/* 45 */
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map