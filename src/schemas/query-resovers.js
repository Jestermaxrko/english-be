const User = require('../models/user-model');
const { validateToken } = require('../controllers/auth-controller');
const { getAll, getDictionary } = require('../controllers/dictionary-controller');
const { getWordsPerDayAggs } = require('../controllers/words-controller');
const { getAllCategories } = require('../controllers/category-controller');

module.exports = {
	users: async () => {
		return await User.find({}, '-id -password');
	},
	user: async (parent, args) => {
		return await User.findById(args.id);
	},
	me: async (parent, args, context) => {
		const userId = validateToken(context);
		return await User.findById(userId);
	},
	dictionaries: async (parent, args, context) => {
		const userId = validateToken(context);
		const params = { userId };
		args.query && (params.name = args.query);
		return await getAll(params);
	},
	dictionary: async (parent, args, context) => {
		validateToken(context);
		const dictionary = await getDictionary({ _id: args.id });
		if (!dictionary) throw new Error('404');
		dictionary.sort = args.sort;
		dictionary.filter = args.filter;
		dictionary.query = args.query;
		return dictionary;
	},
	dayAggs: async (parent, args, context) => {
		validateToken(context);
		return await getWordsPerDayAggs({ dictionaryId: args.dictionaryId });
	},
	categories: async (parent, args, context) => {
		const userId = validateToken(context);
		return await getAllCategories({ userId });
	}
};

