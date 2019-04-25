const moment = require('moment');

const isDaysEqual = (first, second) => {
  return moment(first).format('DD-MM-YYYY') === second;
}

const getDays = (words) => {

  const allDates = words.map(item => moment(item.createdAt).format('DD-MM-YYYY'));
  const uniqueDates = Array.from(new Set(allDates));

    const days = uniqueDates.map(date => {
      const dailyWords = words.filter(item => isDaysEqual(item.createdAt, date));
      return {
        date,
        fullDate: dailyWords[0].updatedAt,
        words: dailyWords,
        count: dailyWords.length
      }
    })

  return days;
}

module.exports = getDays;
