const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
	name: {
		first: String,
		last: String
	}
})

//更好的方式是在personSchema上定义“虚拟属性getter”函数，这样我们就不用每次都写上面这样一长串。
//需要定义在mongoose.model编译前
personSchema.virtual('name.full').get(function() {
	return this.name.first + ' ' + this.name.last;
})

//同样，也可以定义虚拟属性setter函数
personSchema.virtual('name.full').set(function(name) {
	var names = name.split(' ');
	this.name.first = names[0];
	this.name.last = names[1];
})

const Person = mongoose.model('Person', personSchema);

const bad = new Person({
	name: {
		first: 'Walter',
		last: 'White'
	}
})

//我们要输出bad的全名，可以这样：
console.log(bad.name.first + ' ' + bad.name.last);

//定义虚拟属性getter函数后，现在我们可以这样输出bad的全名
console.log('%s is insane', bad.name.full);

bad.name.full = 'Breaking bad';

console.log(bad.name.full);

//Only non-virtual properties work as part of queries and for field selection
//只有非虚属性才能作为查询条件的字段
