const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
	name: String,
	type: String
});

//定义实例方法
animalSchema.methods.findSimilarTypes = function(cb) {
	return this.model('Animal').find({type: this.type}, cb);
}

//定义静态方法，也要定义在mongoose.model编译schema为Model类之前
animalSchema.statics.findByName = function(name, cb) {
	return this.find({name: new RegExp(name, 'i')}, cb);
}

//定义查询帮助函数，用来定义链式查询
animalSchema.query.byName = function(name, cb) {
	return this.find({name: new RegExp(name, 'i')}, cb);
}

const Animal = mongoose.model('Animal', animalSchema);

const dog = new Animal({type: 'dog'});
dog.findSimilarTypes(function(err, dogs) {
	console.log(dogs);
})

Animal.findByName('fido', function(err, animals) {
	console.log('result is ', animals);
})

Animal.find().byName('fido').exec(function(err, animals) {
	console.log(animals);
})

