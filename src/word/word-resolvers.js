module.exports = {
  Word: {
    id: parent => parent.id,
    word: parent => parent.word,
    translation: parent => parent.translation,
    categoryId: parent => parent.categoryId
  },
  DayAggs: {
    date: parent => parent.date,
    total: parent => parent.total
  },
  Category: {
    id: parent => parent.id,
    name: parent => parent.name,
    system: parent => parent.system
  }
}

