
const {Schema, model} = require('mongoose');

const WordSchema = Schema({
  word: {
    type: String,
    required: true
  },
  translation: {
    type: Array,
    required: true
  },
  dictionaryId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  categoryId: String
}, 
{
  timestamps: true
});

const Word = model('Word', WordSchema);
module.exports = Word;
