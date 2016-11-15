const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/TrainingMEN')

db
	.on('error', console.error.bind(console, 'connection error'))
	.once('open', console.log.bind(console, 'database connected!'))
