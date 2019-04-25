
const { createWord } = require('../../controllers/words-controller');
const { createCategory } = require('../../controllers/category-controller');
const { generateToken, validateToken } = require('../../controllers/auth-controller');


module.exports = {
  createWord: async (root, args, context) => {
    const userId = validateToken(context);
    return await createWord({ ...args, userId });
  },
  createCategory: async (root, args, context) => {
    const userId = validateToken(context);
    return await createCategory({ ...args, userId });
  }
}
