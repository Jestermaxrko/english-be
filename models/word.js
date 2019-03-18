
const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  original: {
    type: String,
    required: true
  },
  translation: {
    type: Array,
    required: true
  }
}, 
{
  timestamps: true
});

const Word = mongoose.model('Word', WordSchema);
module.exports = Word;