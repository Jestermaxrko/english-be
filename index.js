const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./src/schemas');
const { url, options } = require('./src/const/mongo-config');

mongoose.connect(url, options);

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	context: request => request
});

server.start({ port: 3000 }, () => {});
