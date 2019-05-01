const User = require('../models/user-model');
const { hashData } = require('../utils/hash');

const create = async user => {
	const password = await hashData(user.password);
	return User.create({ ...user, password });
};

const isUserExists = email => {
	return User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
};

const isNicknameExists = nickname => {
	return User.findOne({ nickname });
};

const getOne = params => {
	return User.findOne(params);
};

const updateAvatar = async (userId, link) => {
	const data = await User.findByIdAndUpdate(userId, { avatar: link },{ new: true });
	return data.avatar;
};

module.exports = {
	create,
	isUserExists,
	getOne,
	isNicknameExists,
	updateAvatar
};
