'use strict';

const { url, options } = require('../const/mongo-config');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

module.exports.up = async next => {
	const client = await MongoClient.connect(url, options);
	const db = await client.db();
	const User = db.collection('users');
	await User.updateMany(
		{ avatar: { $exists: false } },
		{ $set: { 'avatar': '' } },
		{ upsert: false, multi: true }
	);
	client.close();
	next();
};

module.exports.down = function (next) {
	next();
};
