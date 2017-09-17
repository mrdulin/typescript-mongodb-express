import {
  Db, Collection,
  InsertOneWriteOpResult
} from 'mongodb';

interface IUser {
  _id?: string;
  authId: string;
  name: string;
  email?: string;
  role: string;
  created: number;
}

interface IUserMethods {
  save(): Promise<InsertOneWriteOpResult>;
}

class User implements IUser, IUserMethods {
  public static db: Db;
  public static col: Collection;

  public static create(user: IUser): Promise<any> {
    return User.col.insertOne(user)
      .then((result: InsertOneWriteOpResult) => {
        console.log('Insert a document into the collection');
        return result;
      });
  }

  public static findById(id: string): Promise<any> {
    return User.col.findOne({ _id: id }).then((user: IUser) => {
      return user;
    });
  }

  public _id: string;
  public authId: string;
  public name: string;
  public email: string;
  public role: string;
  public created: number;

  constructor(public user: IUser) {
    Object.assign(this, user);
    if (!User.col) {
      User.col = User.db.collection('users');
    }
  }

  public save(): Promise<InsertOneWriteOpResult> {
    return User.col.insertOne(this);
  }
}

export {
  User,
  IUser,
  IUserMethods
};
