import { Db, Collection, MongoError, InsertWriteOpResult } from 'mongodb';
import * as Chance from 'chance';

const chance: Chance.Chance = new Chance();

// import是静态导入，此时database实例中的mongodb实例并不存在
// import database from '../../db';

type ICRUDCallback = (err: any, result?: any) => void;

class Students {
  public static instance: Students;

  constructor(public db: Db) {
    if (Students.instance) {
      return Students.instance;
    }
    // console.log('db', db);
    this.db = db;
    Students.instance = this;
  }
  public create(cb: ICRUDCallback) {
    const collection: Collection = this.db.collection('students');

    const students: any[] = [];
    for (let i = 0; i < 100; i++) {
      const student: any = {
        name: chance.name()
      };
      students.push(student);
    }

    collection.insertMany(students, function (err: MongoError, result: InsertWriteOpResult) {
      if (err) return cb(err);
      console.log('Insert many documents into the <students> collection');
      cb(null, { students: result });
    });
  }

  /**
   * 使用skip略过少量文档效率不会有什么影响，如果略过大量结果，则可能会产生性能瓶颈！对于skip，我们通常的应用可能是在分页时！对于分页，我们有两种方式来应对：
   * 1. 将分页的处理放在应用层，即将数据全部查出，然后在应用层处理分页显示！这就是通常所说的伪分页！
   * 2. 如果分页必须在数据库端进行，这通常是数据量太大的情况！这时，我们先尝试使用skip操作，如果出现性能瓶颈，我们只能根据一个排序键，在获取下页数据时，首先根据上一页最后一个文档中该键的值来查询文档，最后排序截取即可！这样就可以避免使用skip！
   */
  public query(page: number, pageSize: number, cb: ICRUDCallback) {
    const collection: Collection = this.db.collection('students');

    //返回一个游标
    collection.count({}, function (err: MongoError, total: number) {
      if (err) return cb(err);

      collection.find({})
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .toArray(function (error: MongoError, result) {
          if (error) cb(error);
          console.log('Query documents from <students> collection');
          cb(null, {
            students: result,
            total
          });
        });

    });
  }
}

export default Students;
