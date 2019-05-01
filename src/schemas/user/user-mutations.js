
const { create } = require('../../controllers/user-controller');
const { generateToken, authorizeUser } = require('../../controllers/auth-controller');
const { isUserExists, isNicknameExists } = require('../../controllers/user-controller');

module.exports = {
	authorize: async (root, args) => {
		const auth = await authorizeUser(args);
		return auth;
	},
	createUser: async (root, args) => {
		const user = await isUserExists(args.email);
		if (user) throw new Error(JSON.stringify({ email: 'User with this email already exsits' }));
		const nick = await isNicknameExists(args.nickname);
		if(nick) throw new Error(JSON.stringify({ nickname: 'User with this nickname already exsits' }));

		const createdUser = await create(args);
		return { user: createdUser, token: generateToken(createdUser.id) };
	},
};
