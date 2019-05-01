const { Schema, model } = require('mongoose');

const DictionarySchema = new Schema({
	from: {
		type: String,
		required: true
	},
	to: {
		type: String,
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	name: String,
}, {
	timestamps: true
});

module.exports = model('Dictionary', DictionarySchema);
