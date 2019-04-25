const Word = require('../models/word-model');
const moment = require('moment');
// wordsController.getAll = (req, res, next) => {
//   try {
//     const words = await Word.find().sort({ updatedAt: -1 });
//     res.json(words);
//   } catch (err) { return next(err) }
// }


const createWord = async params => {
  const suggestions = await Word.find({ 
    word: { $regex: new RegExp(`^${params.word}$`, "i") } , 
    dictionaryId: params.dictionaryId });

  if (!suggestions.length) return await Word.create(params);

  const existedTranslations = suggestions[0].translation;

  const newTranslations = params.translation.filter(item => {
    const index = existedTranslations.findIndex(word => word.toLowerCase() === item.toLowerCase())
    if (index < 0) return item;
  })


  if (newTranslations.length) {
    const newArray = [...existedTranslations, ...newTranslations]

    const newWord = await Word.findOneAndUpdate(
      { word: params.word },
      { translation: newArray },
      { new: true }
    )
    return newWord;
  }

  throw new Error('already added');

}

const getAll = ({ params = {}, sort = -1, filter = [], query }) => {

  if (filter.length) {
    params.categoryId = { $in: filter };
  }

  if (query) {
    params.word = { $regex: new RegExp(`^${query}`, 'i') }
  }

  return Word.find(params).sort({ updatedAt: sort });
}

const getWordsPerDayAggs = async (params = {}) => {
  let words = await Word.find(params);
  words = words.filter(word => word.updatedAt);
  const allDays = words.map(word => moment(word.updatedAt).format('YYYY-MM-DD'));
  const uniqueDays = Array.from(new Set(allDays));

  const aggs = [];

  uniqueDays.forEach(day => {
    aggs.push({
      date: moment(day).format('x'),
      total: allDays.filter(item => item === day).length
    })
  });

  return aggs;
}

module.exports = {
  getAll,
  createWord,
  getWordsPerDayAggs
}

