const User = require('../models/user-model');
const { hashData } = require('../services/utils');

const create = async user => {
  const password = await hashData(user.password);
  return User.create({ ...user, password });
}

const isUserExists = email => {
  return User.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });
}

const isNicknameExists = nickname => {
  return User.findOne({ nickname });
}

const getOne = params => {
  return User.findOne(params);
}

module.exports = {
  create,
  isUserExists,
  getOne,
  isNicknameExists
};
