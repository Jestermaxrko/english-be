
const bcrypt = require('bcrypt');

module.exports.hashData = async data => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
}

module.exports.compareHash = async ( data, hash ) => {
  return await bcrypt.compare(data, hash);
}
