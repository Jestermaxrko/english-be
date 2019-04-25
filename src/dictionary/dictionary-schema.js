module.exports = `
type Dictionary {
  id: ID!
  userId: String!,
  name: String,
  from: String!
  to: String!, 
  words: [Word!]
}
`
