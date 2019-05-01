const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../const/auth-params');
const { getOne } = require('./user-controller');
const { compareHash } = require('../utils/hash');

const generateToken = userId => {
	return jwt.sign({ userId }, secret, { expiresIn });
};

const validateToken = ({ request }) => {
	const Authorization = request.get('Authorization');
	if (Authorization) {
		const token = Authorization.replace('Bearer ', '');
		const { userId } = jwt.verify(token, secret);
		return userId;
	}

	throw new Error('Not authenticated');
};

const authorizeUser = async ({ email, password }) => {
	const user = await getOne({ email });
	if(!user) throw new Error(JSON.stringify({ password: 'Wrong email or password' }));
	const isEqual = await compareHash(password, user.password);
	if (!isEqual) throw new Error(JSON.stringify({ password: 'Wrong email or password' }));
	return { user, token: generateToken(user.id) };
};

module.exports = {
	generateToken,
	validateToken,
	authorizeUser
};
