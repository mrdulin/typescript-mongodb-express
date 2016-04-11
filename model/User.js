/**
 * Created by Administrator on 2016/4/11.
 */
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    createdOn: {
        type: Date,
        'default': Date.now()
    },
    modifiedOn: Date,
    lastLogin: Date
});

userSchema.statics = {
    findById: findById
};

function findById(id, cb) {
    return this.findOne({_id: id}, cb);
}

var User = mongoose.model('User', userSchema);

module.exports = User;