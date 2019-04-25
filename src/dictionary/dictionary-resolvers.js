const { getAll } = require('../../controllers/words-controller');

module.exports = {
  Dictionary: {
    id: parent => parent.id,
    userId: parent => parent.userId,
    name: parent => parent.name,
    from: parent => parent.from,
    to: parent => parent.to,
    words: async (parent, args) => {
      const words = await getAll( { 
        params: { dictionaryId: parent.id}, 
        sort: parent.sort, 
        filter: parent.filter, 
        query: parent.query,
      })
      return words
    }
  }
}
