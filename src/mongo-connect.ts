// var MongoClient = require('mongodb').MongoClient;

import { MongoClient, Db, MongoError } from 'mongodb';

/**
 * 连接数据库实例，该数据库实例运行在localhost:27017上，typescript-mongodb-express表示使用的数据库名称，
 * 如果数据库名称省略，则MongoClient会使用默认的test数据库
 */
const mongodbUrl: string = 'mongodb://localhost:27017/typescript-mongodb-express';
let dbInstance: Db | null;

type IMongoCallback = (err?: MongoError) => void;

function connect(url: string, done?: IMongoCallback) {
  if (dbInstance) return done();

  MongoClient.connect(url, (err: MongoError, db: Db) => {
    if (err) return done(err);
    console.log("Connected successfully to server");
    dbInstance = db;
    done();
  });
}

function get() {
  return dbInstance;
}

function close(done: IMongoCallback) {
  if (dbInstance) {
    dbInstance.close(function (err, result) {
      dbInstance = null;
      done(err);
    });
  }
}

// Connect to Mongo on start
connect(mongodbUrl, function (err: MongoError) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  }
});
