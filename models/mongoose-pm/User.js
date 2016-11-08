/**
 * Created by Administrator on 2016/4/11.
 */
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {validator: nameLengthValidator, msg: 'username must be gt 5 characters'}
    },
    email: {
        type: String,
        unique: true,
        required: true
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

function nameLengthValidator(name) {
    return name && name.length > 5;
}

var User = mongoose.model('User', userSchema);

module.exports = User;