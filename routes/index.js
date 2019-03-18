var express = require('express');
var router = express.Router();
const Word = require('../models/word');
const getDays = require('../utils/words');

router.get('/api/days', async (req, res, next) => {
  try {
    const words = await Word.find();
    res.json(getDays(words));
  } catch (err) {
    return next(err);
  }
});

router.get('/api/words', async (req, res, next) => {
  try {
    const words = await Word.find().sort( { updatedAt: -1 } );
    res.json(words);
  } catch (err) {
    return next(err);
  }
});


//get world
router.get('/:id', async (req, res) => {
  res.json('Helloo');
})

router.post('/api/word', async (req, res, next) => {
  try {
    const suggestions = await Word.find({ original: req.body.original });

    if (!suggestions.length) {
      const addedPost = await Word.create(req.body);
      res.send(addedPost);
    } else {
      const existedTranslations = suggestions[0].translation;
      const newTranslations = req.body.translation.filter(item => {
        const index = existedTranslations.findIndex(word => word === item)
        if (index < 0) return item;
      })


      if (newTranslations.length) {
        const newArray = [...existedTranslations, ...newTranslations]

        const resp = await Word.findOneAndUpdate(
          { original: req.body.original },
          { translation: newArray },
          { new: true }
        )
        res.send(resp)

      } else {
        res.status(404).json({ erorr: 'already added' })
      }
    }

    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

module.exports = router;
