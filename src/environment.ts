import { Application } from "express";
import * as path from 'path';
import * as Ejs from 'ejs';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as favicon from 'serve-favicon';
import flash = require('connect-flash');
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectMongo from 'connect-mongo';
import { Db } from 'mongodb';
const qiniu = require('qiniu');

import normalizePort, { Port } from './helpers/normalizePort';
import viewHelperMiddleware from './middlewares';
const pkg = require('../package.json');
import { config } from './config';

const setupEnvironment = (app: Application, express: any, db: Db) => {

  const cwd: string = process.cwd();
  const env: string = process.env.NODE_ENV === 'production' ? 'production' : 'development';

  const staticDir: string = path.resolve(cwd, 'build/public');
  const libDir: string = path.resolve(cwd, 'node_modules');
  const viewsDir: string = path.resolve(cwd, 'build/views');
  const uploadDir: string = path.resolve(cwd, './upload');
  const port: Port = normalizePort(process.env.PORT || config.DEFAULT_PORT);

  const mac = new qiniu.auth.digest.Mac(config.qiniu.ak, config.qiniu.sk);
  const options = {
    scope: config.qiniu.bucket
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  const uploadConf = new qiniu.conf.Config();
  uploadConf.zone = qiniu.zone.Zone_z0;
  const formUploader = new qiniu.form_up.FormUploader(uploadConf);
  const putExtra = new qiniu.form_up.PutExtra();
  const bucketManager = new qiniu.rs.BucketManager(mac, uploadConf);

  // -- for guest-book testing --
  const entries: any[] = [];
  app.locals.entries = entries;
  // -- --

  app.locals.contants = {
    appVersion: pkg.version
  };
  app.set('AppQiniu', {
    uploadToken,
    uploadConf,
    formUploader,
    putExtra,
    bucketManager,
    mac
  });
  // app.set('io', io);
  app.set('db', db);

  const MongoStore: connectMongo.MongoStoreFactory = connectMongo(session);

  app.use(favicon(path.resolve(process.cwd(), 'build/public/favicon.jpeg')));
  app.use('/app', express.static(staticDir));
  app.use('/lib', express.static(libDir));

  //connect-express 1.5.0版本以后，不再需要依赖cookie-parser中间件
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
    secret: config.cookieSecretKey,
    store: new MongoStore({
      db
    })
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(viewHelperMiddleware(pkg.name));

  app.use(morgan('dev'));

  app.set('passport', passport);
  app.set('env', env);
  app.set('port', port);
  app.set('views', viewsDir);
  app.set('upload', uploadDir);
  app.set('view engine', 'ejs');
  app.engine('ejs', Ejs.renderFile);

};

export default setupEnvironment;
