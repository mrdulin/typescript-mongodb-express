
// var db = require(__base + 'db');
// var mongodb = require('mongodb');
import { Db, Collection, MongoError, ObjectID, InsertOneWriteOpResult } from 'mongodb';

type IMongoCallback = (err: MongoError | null, result?: any) => void;

class Sentence {
  public col: Collection;

  constructor(private db: Db) {
    this.db = db;
    this.col = this.db.collection('sentence');
  }

  public create(data: { enText: string, cnText: string }): Promise<any> {
    return this.col.insertOne(data)
      .then((result: InsertOneWriteOpResult) => {
        console.log('Insert a document into the collection');
        return result;
      });
  }

  public remove(id: string, cb: IMongoCallback) {
    this.col.deleteOne({ _id: new ObjectID(id) }, function (err: MongoError, result: any) {
      if (err) cb(err);
      console.log('Delete a document from the collection');
      cb(null, result);
    });
  }

  public deleteAll(cb: IMongoCallback) {
    this.col.deleteMany({}, function (err: MongoError, result: any) {
      if (err) cb(err);
      console.log('Delete all documents from the collection');
      cb(null, result);
    });
  }

  public query(query: string, cb: IMongoCallback) {
    this.col.find(query, function (err: MongoError, result: any) {
      if (err) cb(err);
      console.log("Found the following records");
      cb(null, result);
    });
  }

  public all(cb: IMongoCallback) {
    this.col.find({}).toArray(function (err: MongoError, result: any) {
      if (err) cb(err);
      console.log("Found the following records");
      cb(null, result);
    });
  }
}

export default Sentence;

