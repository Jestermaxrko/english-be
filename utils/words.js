const moment = require('moment');

const isDaysEqual = (first, second) => {
  console.log(first)
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



  // const unique = [...new Set(allDates.map(item => item.shortDate))]; 
  // const days = unique.map ( date => {
  //   const wordPerDay = allDates.filter(item => item.shortDate === date);
  //   console.log(wordPerDay);
  //   if(wordPerDay.length){
  //     return {
  //       date,
  //       fullDate: wordPerDay[0].fullDate,
  //       count: wordPerDay.length,
  //       words: words.filter(item => isIsoStringsEqual(item.createdAt,  wordPerDay[0].fullDate)) 
  //     }
  //   }
  // });

  return days;
}

module.exports = getDays;