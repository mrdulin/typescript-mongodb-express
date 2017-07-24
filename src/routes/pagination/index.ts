import * as express from 'express';
import { Router } from "express-serve-static-core";
const router: Router = express.Router();

Students = require(__base + 'models/pagination/students');

router
    .get('/', function (req, res, next) {

        var total = 80,
            pageSize = 8,
            pageCount = 80 / 8,
            currentPage = 1,
            students = [],
            studentsArrays = [],
            studentsList = [];

        //genreate list of students
        for (var i = 1; i < total; i++) {
            students.push({ name: 'Student Number ' + i });
        }

        //split list into groups
        while (students.length > 0) {
            studentsArrays.push(students.splice(0, pageSize));
        }

        //set current page if specifed as get variable (eg: /?page=2)
        if (typeof req.query.page !== 'undefined') {
            currentPage = +req.query.page;
        }

        //show list of students from group
        studentsList = studentsArrays[+currentPage - 1];

        //render index.ejs view file
        res.render('./pagination/index', {
            students: studentsList,
            pageSize: pageSize,
            total: total,
            pageCount: pageCount,
            currentPage: currentPage
        });
    })
    .get('/students', function(req, res, next) {
        var page = +req.query.page || 1,
            pageSize = +req.query.pageSize || 10;

        Students.query(page, pageSize, function(err, result, total) {
            if(err) next(err);
            var isFirstPage = page - 1 === 0;
            var isLastPage = (page - 1) * pageSize + result.length === total;
            res.render('./pagination/students', {
                students: result,
                page: page,
                total: total,
                isFirstPage: isFirstPage,
                isLastPage: isLastPage
            })
        });
    })

module.exports = router;
