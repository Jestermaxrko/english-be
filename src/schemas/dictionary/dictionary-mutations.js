const { create, remove } = require('../../controllers/dictionary-controller');
const { validateToken } = require('../../controllers/auth-controller');

module.exports = {
	createDictionary: async (root, args, context) => {
		const userId = validateToken(context);
		const dictionary = await create({ ...args, userId });
		return dictionary;
	},
	deleteDictionary: async (root, args, context) => {
		const userId = validateToken(context);
		const dictionary = await remove({ userId, _id: args.id });
		if (!dictionary) throw new Error('Access denied');
		return dictionary;
	}
};
