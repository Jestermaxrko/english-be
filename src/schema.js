const { userSchema, userResolvers, userMutations } = require('./user')
const { dictionarySchema, dictionaryResolvers, dictionaryMutations } = require('./dictionary');
const { wordSchema, wordResolvers, wordMutations } = require('./word');
const User = require('../models/user-model');
const { generateToken, validateToken } = require('../controllers/auth-controller');
const { getAll, getDictionary } = require('../controllers/dictionary-controller');
const { getWordsPerDayAggs } = require('../controllers/words-controller');
const { getAllCategories } = require('../controllers/category-controller');
const query =
  `
type Query {
  users: [User],
  user(id: String): User,
  auth: Auth
  me: User,
  dictionaries(query: String): [Dictionary],
  dictionary(id: String, sort: Int, filter: [String], query: String): Dictionary!,
  dayAggs(dictionaryId: String!): [DayAggs],
  categories: [Category]
}
type Mutation {
  createUser(nickname: String!, email: String!, password: String!, passwordConf: String!): Auth!
  authorize(email: String!, password: String!): Auth!
  createDictionary(name: String, from: String!, to: String!): Dictionary!
  deleteDictionary(id: String!): Dictionary!
  createWord(dictionaryId: String!, word: String!, translation: [String!]!, categoryId: String): Word!
  createCategory(name: String!): Category!
}
`

const typeDefs = [
  query,
  userSchema,
  dictionarySchema,
  wordSchema
]

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}, '-id -password')
    },
    user: async (parent, args) => {
      return await User.findById(args.id)
    },
    me: async (parent, args, context) => {
      const userId = validateToken(context);
      return await User.findById(userId)
    },
    dictionaries: async (parent, args, context) => {
      const userId = validateToken(context);
      const params = { userId };
      args.query && (params.name = args.query)
      return await getAll(params);
    },
    dictionary: async (parent, args, context) => {
      validateToken(context);
      const dictionary = await getDictionary({ _id: args.id });
      if (!dictionary) throw new Error('404');
      dictionary.sort = args.sort;
      dictionary.filter = args.filter;
      dictionary.query = args.query;
      return dictionary;
    },
    dayAggs: async (parent, args, context) => {
      validateToken(context);
      return await getWordsPerDayAggs({ dictionaryId: args.dictionaryId });
    },
    categories: async (parent, args, context) => {
      const userId = validateToken(context);
      return await getAllCategories({ userId });
    }
  },
  Mutation: {
    ...userMutations,
    ...dictionaryMutations,
    ...wordMutations

  },
  ...userResolvers,
  ...dictionaryResolvers,
  ...wordResolvers
}

module.exports = {
  resolvers,
  typeDefs
}
