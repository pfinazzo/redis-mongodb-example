const bcrypt = require('bcrypt');

function decodeHash(plaintext, hash) {
  try {
    return bcrypt.compareSync(plaintext, hash);
  } catch (err) {
    if (err) {
      console.error('there was an error creating your hash');
      console.error(err);
      throw new Error(err.message);
    }
  }
}


module.exports = decodeHash;