var db = require(__base + 'db');
var mongodb = require('mongodb');

exports.create = function(enText, cnText, cb) {
    var collection = db.get().collection('sentence');

    collection.insert({enText: enText, cnText: cnText}, function(err, result) {
        if(err) cb(err, null);
        console.log('Insert a document into the collection');
        cb(null, result);
    })
};

exports.remove = function(id, cb) {
    var collection = db.get().collection('sentence');

    collection.remove({_id: new mongodb.ObjectId(id)}, function(err, result) {
        if(err) cb(err, null);
        console.log('Delete a document from the collection');
        cb(null, result);
    })
};

exports.deleteAll = function(cb) {

    
};

exports.update = function() {

};

exports.query = function (id, cb) {
    var collection = db.get().collection('sentence');

    collection.find(query, function(err, result) {
        if(err) cb(err, null);
        console.log("Found the following records");
        cb(null, result);
    })
};

exports.all = function(cb) {
    var collection = db.get().collection('sentence');

    collection.find({}).toArray(function(err, result) {
        if(err) cb(err, null);
        console.log("Found the following records");
        cb(null, result);
    })
};

