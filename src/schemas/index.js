const { userSchema, userResolvers, userMutations } = require('./user');
const { dictionarySchema, dictionaryResolvers, dictionaryMutations } = require('./dictionary');
const { wordSchema, wordResolvers, wordMutations } = require('./word');

const { GraphQLUpload }  = require('graphql-upload');

const { singleUpload } = require('../utils/file-upload');

const Query = require('./query-resovers');

const query =
  `
scalar Upload
type Query {
  users: [User],
  user(id: String): User,
  auth: Auth
  me: User,
  dictionaries(query: String): [Dictionary],
  dictionary(id: String, sort: Int, filter: [String], query: String): Dictionary!,
  dayAggs(dictionaryId: String!): [DayAggs],
  categories: [Category],
  uploads: [File]
}
type Mutation {
  createUser(nickname: String!, email: String!, password: String!, passwordConf: String!): Auth!
  authorize(email: String!, password: String!): Auth!
  createDictionary(name: String, from: String!, to: String!): Dictionary!
  deleteDictionary(id: String!): Dictionary!
  createWord(dictionaryId: String!, word: String!, translation: [String!]!, categoryId: String): Word!
  createCategory(name: String!): Category!
  singleUpload(file: Upload!): String!
}
type File {
  url: String!
}
`;

const typeDefs = [
	query,
	userSchema,
	dictionarySchema,
	wordSchema
];

const resolvers = {
	Upload: GraphQLUpload,
	Query,
	Mutation: {
		...userMutations,
		...dictionaryMutations,
		...wordMutations,
		singleUpload
	},
	...userResolvers,
	...dictionaryResolvers,
	...wordResolvers
};

module.exports = {
	resolvers,
	typeDefs
};
