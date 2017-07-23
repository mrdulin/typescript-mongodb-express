var MongoClient = require('mongodb').MongoClient,

const url = 'mongodb://localhost:27017/TrainingMEN';
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

// Connect to Mongo on start
exports.connect(url, function (err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(app.get('port'), function () {
      console.log('App listen on port ' + app.get('port'));
    });
  }
})
