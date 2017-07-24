import * as express from 'express';
import { Router, Request, Response, NextFunction } from "express-serve-static-core";
const router: Router = express.Router();
import StudentCollection from '../../models/pagination/students';
import { MongoError, Db } from 'mongodb';

router

  /**
   * mock数据分页测试
   */
  .get('/', function (req: Request, res: Response, next: NextFunction) {
    const db: Db = res.locals.db;
    console.log(db);
    const studentCollection = new StudentCollection(db);

    const total: number = 80;
    const pageSize: number = 8;
    const pageCount: number = total / pageSize;
    let currentPage: number = 1;
    const students: any = [];
    const studentsArrays: any[] = [];
    let studentsList: any[] = [];

    //genreate list of students
    for (let i = 1; i < total; i++) {
      students.push({ name: 'Student Number ' + i });
    }

    //split list into groups
    while (students.length > 0) {
      studentsArrays.push(students.splice(0, pageSize));
    }

    //set current page if specifed as get variable (eg: /?page=2)
    if (typeof req.query.page !== 'undefined') {
      currentPage = Number.parseInt(req.query.page, 10);
    }

    //show list of students from group
    studentsList = studentsArrays[+currentPage - 1];

    studentCollection.create((err: MongoError | null, data: any) => {
      // console.log(JSON.stringify(data, null, 2));
    });

    res.render('./pagination/index', {
      students: studentsList,
      pageSize,
      total,
      pageCount,
      currentPage
    });
  })

  /**
   * 连接真实数据库，数据库分页查询
   */
  .get('/students', function (req: Request, res: Response, next: NextFunction) {
    const page: number = Number.parseInt(req.query.page, 10) || 1;
    const pageSize: number = Number.parseInt(req.query.pageSize, 10) || 10;
    const db: Db = res.locals.db;
    const studentCollection = new StudentCollection(db);

    studentCollection.query(page, pageSize, function (err: MongoError | null, data: any) {
      if (err) next(err);

      res.render('./pagination/index', {
        students: data.students,
        currentPage: page,
        total: data.total,
        pageSize,
        pageCount: data.total / pageSize
      });
    });
  });

export default router;
