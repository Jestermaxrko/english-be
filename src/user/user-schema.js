module.exports = `
type User {
  id: ID!
  nickname: String!
  email: String
  firstname: String
  lastname: String
  password: String
  passwordConf: String
}
type Auth {
  user: User!,
  token: String!,
}
`
