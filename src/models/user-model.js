const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	nickname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
	},
	firstname: String,
	lastname: String,
	avatar: String,
});

module.exports = model('User', userSchema);
