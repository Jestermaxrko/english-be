const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./src/schema');

mongoose.connect('mongodb://jester:maxjester1@ds147566.mlab.com:47566/dictionary', { useNewUrlParser: true });

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => request
})

server.start({ port: 3000 }, () => console.log(`Server is running on http://localhost:4000`))
