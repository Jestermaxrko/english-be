module.exports = `
type Word {
  id: ID!
  word: String!
  translation: [String!],
  dictionaryId: String!,
  categoryId: String,
  userId: String!
}
type DayAggs {
  date: String!,
  total: Int!
}
type WordFilter {
  sort: Int,
  categories: [String]
}
type Category {
  id: ID!
  name: String!,
  system: Boolean
}
`
