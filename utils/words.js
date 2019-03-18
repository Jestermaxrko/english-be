

const isIsoStringsEqual = (first, second) => {

  return first.toISOString().slice(0, 10) === second.toISOString().slice(0, 10)
}

const getDays = (words) => {
  const allDates = [];
  words.map(item => {
    const date = new Date(item.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();

    allDates.push({
      shortDate: day + '/' + month + '/' + year,
      fullDate: item.createdAt
    });
  })


  const unique = [...new Set(allDates.map(item => item.shortDate))]; 
  const days = unique.map ( date => {
    const wordPerDay = allDates.filter(item => item.shortDate === date);
    if(wordPerDay.length){
      return {
        date,
        fullDate: wordPerDay[0].fullDate,
        count: wordPerDay.length,
        words: words.filter(item => isIsoStringsEqual(item.createdAt,  wordPerDay[0].fullDate)) 
      }
    }
  });

  return days;
}

module.exports = getDays;