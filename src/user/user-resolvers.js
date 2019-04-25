
module.exports = {
  Auth: {
    user: parent => parent.user,
    token: parent => parent.token
  },
  User: {
    id: parent => parent.id,
    email: parent => parent.email,
    firstname: parent => parent.firstname,
    lastname: parent => parent.lastname,
    nickname: parent => parent.nickname
  },
}
