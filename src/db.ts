import { MongoClient, Db, MongoError } from 'mongodb';

/**
 * 连接数据库实例，该数据库实例运行在localhost:27017上，typescript-mongodb-express表示使用的数据库名称，
 * 如果数据库名称省略，则MongoClient会使用默认的test数据库
 */
type IMongoCallback = (err: MongoError | null, db?: Db) => void;

class Database {
  public static url: string = 'mongodb://localhost:27017/typescript-mongodb-express';
  public static instance: Database;
  public db: Db;

  constructor(private mongoClient: MongoClient) {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
  }

  public connect(done: IMongoCallback): void {
    if (this.db) return done(null, this.db);

    this.mongoClient.connect(Database.url, (err: MongoError, db: Db) => {
      if (err) return done(err);
      console.log("Connected successfully to server");
      this.db = db;
      done(null, db);
    });
  }

  public close(done: IMongoCallback) {
    if (this.db) {
      this.db.close(function (err, result) {
        done(err);
      });
    }
  }

  public get() {
    return this.db;
  }
}

export default new Database(MongoClient);
