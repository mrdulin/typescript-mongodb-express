var db = require(__base + 'db');

exports.create = function (cb) {
  var collection = db.get().collection('students')

  var students = [];
  for (var i = 0; i < 100; i++) {
    students.push({ name: 'student ' + i });
  }

  collection.insertMany(students, function (err, r) {
    if (err) cb(err, null);
    console.log('Insert many documents into the <students> collection');
    cb(null, r);
  });
}

/**
 * 使用skip略过少量文档效率不会有什么影响，如果略过大量结果，则可能会产生性能瓶颈！对于skip，我们通常的应用可能是在分页时！对于分页，我们有两种方式来应对：
 * 1. 将分页的处理放在应用层，即将数据全部查出，然后在应用层处理分页显示！这就是通常所说的伪分页！
 * 2. 如果分页必须在数据库端进行，这通常是数据量太大的情况！这时，我们先尝试使用skip操作，如果出现性能瓶颈，我们只能根据一个排序键，在获取下页数据时，首先根据上一页最后一个文档中该键的值来查询文档，最后排序截取即可！这样就可以避免使用skip！
 */
exports.query = function (page, pageSize, cb) {
  var collection = db.get().collection('students');

  //返回一个游标
  collection.count({}, function (err, total) {

    collection.find({}).skip((page - 1) * pageSize).limit(pageSize).toArray(function (err, result) {
      if (err) cb(err, null);
      console.log('Query documents from <students> collection');
      cb(null, result, total);
    })
  })

}
