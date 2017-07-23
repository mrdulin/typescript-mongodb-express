const mongoose = require('mongoose');
// const db = require('./db');


//定义schema，schema对应mongodb中的collection，定义在该collection中每个document的数据结构，类型，字段等
const kittySchema = mongoose.Schema({
	name: String
});

//定义实例方法
//mongoose实例(document)指：数据模型类的实例。和Mongodb中的document是一一对应的关系。
//实例上有很多内置的方法，我们也可以定义自己的实例方法
//定义在methods上的方法，最后编译成Model类后，是放在Model类的prototype上的，因此通过此类new出的实例都可以访问
//必须定义在使用mongoose.model()方法编译schema之前，否则实例调用方法是会提示函数不存在
kittySchema.methods.speak = function() {
	//this默认指向实例对象
	// console.log(this.model('Kitten'))
	const greeting = this.name ? 'Meow name is ' + this.name : "I don't have a name";
	console.log(greeting);
}

//把schema编译为Model, Kitten是一个类
const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({name: 'slience'});
console.log(silence.name);

const fluffy = new Kitten({name: 'fluffy'});
fluffy.speak();


// 在实例上调用save方法，可以存储该实例到数据库
// save是定义在schema.methods上的方法
// fluffy.save((err, fluffy) => {
// 	if(err) return console.error(err);
// 	fluffy.speak();
// })

//通过调用Kitten类上的find方法，可以查找到所有该集合下所有的document
//find静态方法
// Kitten.find(function(err, kittens) {
// 	if(err) return console.log(err);
// 	console.log(kittens);
// })
