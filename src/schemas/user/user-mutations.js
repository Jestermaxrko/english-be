
const { create } = require('../../controllers/user-controller');
const { generateToken, authorizeUser } = require('../../controllers/auth-controller');
const { isUserExists, isNicknameExists, updateUserInfo, getUserById } = require('../../controllers/user-controller');
const { validateToken } = require('../../controllers/auth-controller');

module.exports = {
	authorize: async (root, args) => {
		const auth = await authorizeUser(args);
		return auth;
	},
	createUser: async (root, args) => {
		const user = await isUserExists(args.email);
		if (user) throw new Error(JSON.stringify({ email: 'User with this email already exsits' }));
		const nick = await isNicknameExists(args.nickname);
		if (nick) throw new Error(JSON.stringify({ nickname: 'User with this nickname already exsits' }));

		const createdUser = await create(args);
		return { user: createdUser, token: generateToken(createdUser.id) };
	},
	updateUser: async (root, args, context) => {
		const userId = validateToken(context);
		const user = await getUserById(userId);
		const updatedInfo = { ...args };

		if (user.email === args.email) {
			delete updatedInfo.email
		} else {
			const user = await isUserExists(args.email);
			if (user) throw new Error(JSON.stringify({ email: 'User with this email already exsits' }));
		}

		if (user.nickname === args.nickname) {
			delete updatedInfo.nickname;
		} else {
			const nick = await isNicknameExists(args.nickname);
			if (nick) throw new Error(JSON.stringify({ nickname: 'User with this nickname already exsits' }));
		}
		return await updateUserInfo(userId, args);
	}
};
