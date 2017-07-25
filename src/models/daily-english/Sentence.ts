import {
  Db, Collection, ObjectID,
  InsertOneWriteOpResult, DeleteWriteOpResultObject
} from 'mongodb';

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

  public remove(id: string) {
    return this.col.deleteOne({ _id: new ObjectID(id) }).then((result: DeleteWriteOpResultObject) => {
      console.log('Delete a document from the collection');
      return result;
    });
  }

  public deleteAll() {
    return this.col.deleteMany({}).then((result: DeleteWriteOpResultObject) => {
      console.log('Delete all documents from the collection, total: %s', result.deletedCount);
      return result;
    });
  }

  public all() {
    return this.col.find().toArray().then((result) => {
      console.log("Found the following records");
      return result;
    });
  }
}

export default Sentence;

