const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	birthday: {type: Date, required: true},
	tasks: [{name: String, description: String, dueDate: Date}]
});

module.exports = mongoose.model('User', UserSchema);