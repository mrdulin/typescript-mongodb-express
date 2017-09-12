import { MongoClient, Db, MongoError } from 'mongodb';
import { config } from './config';
/**
 * 连接数据库实例，该数据库实例运行在localhost:27017上，typescript-mongodb-express表示使用的数据库名称，
 * 如果数据库名称省略，则MongoClient会使用默认的test数据库
 */
type IMongoCallback = (err: MongoError | null, db?: Db) => void;

class Database {
  public static url: string = config.DB_URL;
  public static instance: Database;
  public db: Db;

  constructor(private mongoClient: MongoClient) {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
  }

  public connect(): Promise<Db | void> {
    if (this.db) return Promise.resolve(this.db);

    return this.mongoClient
      .connect(Database.url)
      .then((db: Db) => {
        console.log("连接数据库成功。");
        this.db = db;
        return db;
      })
      .catch((err: MongoError) => {
        console.log('连接数据库失败.', err.stack);
        process.exit(1);
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
