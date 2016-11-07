var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://localhost:27017/TrainingMEN';

/**
 * 连接数据库实例，该数据库实例运行在localhost:27017上，TrainingMEN表示使用的数据库名称，如果数据库名称省略，则MongoClient会使用默认的test数据库
 */
// MongoClient.connect(url, function (err, db) {
    // assert.equal(null, err);
    // console.log("Connected successfully to server");

    // insertDocuments(db, function () {
    // findDocuments(db, function () {
    // updateDocument(db, function () {
    // removeDocument(db, function () {
    // indexCollection(db, function () {
        // createCapped(db, function() {
        //     db.close();
        // })
    // })
    // })
    // })
    // })
    // })
// })

/** 
 * 向名为documents的集合中插入3个文档
 */
function insertDocuments(db, callback) {
    // 拿到数据库的名为documents的集合
    var collection = db.collection('documents');
    // 插入3个文档
    collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

/**
 * 从名为documents的集合中查找所有包含{a: 3}的文档
 */
function findDocuments(db, callback) {
    var collection = db.collection('documents');

    collection.find({ 'a': 3 }).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

/**
 * 更新集合documents的第一个包含{a: 2}的这个文档，添加一个字段 
 */
function updateDocument(db, callback) {
    var collection = db.collection('documents');

    collection.updateOne({ a: 2 }, { $set: { b: 1 } }, function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a equal to 2");
        callback(result);
    });
}

/**
 * 删除集合documents的第一个包含{a: 3}的文档
 */
function removeDocument(db, callback) {
    var collection = db.collection('documents');

    collection.deleteOne({ a: 3 }, function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document with the field a equal to 3");
        callback(result);
    });
}

/**
 * 创建索引
 */
function indexCollection(db, callback) {
    db.collection('documents').createIndex(
        { "a": 1 },
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
};

/**
 * 创建Capped Collection， 是一种特殊的集合，它大小固定，当集合的大小达到指定大小时，新数据覆盖老数据。
 */
function createCapped(db, callback) {
    db.createCollection("myCollection", { "capped": true, "size": 1000, "max": 2 },
        function (err, results) {
            console.log("Collection created.");
            callback();
        }
    );
};

module.exports = router;