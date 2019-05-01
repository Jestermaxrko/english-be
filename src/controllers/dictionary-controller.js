const Dictionary = require('../models/dictionary-model');
const Word = require('../models/word-model');

const getDictionary = (params = {}) => {
	return Dictionary.findOne(params);
};

const getAll = (params = {}) => {
	return Dictionary.find(params || {}).sort({ createdAt: -1 });
};

const create = (params = {}) => {
	return Dictionary.create(params);
};

const remove = async (params = {}) => {
	await Word.deleteMany({ dictionaryId: params._id, userId: params.userId });
	return Dictionary.findByIdAndDelete(params);
};

module.exports = {
	getAll,
	create,
	remove,
	getDictionary
};
