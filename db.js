var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var state = {
    db: null,
}

exports.connect = function (url, done) {
    if (state.db) return done()

    /**
     * 连接数据库实例，该数据库实例运行在localhost:27017上，TrainingMEN表示使用的数据库名称，如果数据库名称省略，则MongoClient会使用默认的test数据库
     */
    MongoClient.connect(url, function (err, db) {
        if (err) return done(err)
        assert.equal(null, err);
        console.log("Connected successfully to server");    
        state.db = db
        done()
    })
}

exports.get = function () {
    return state.db
}

exports.close = function (done) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
}