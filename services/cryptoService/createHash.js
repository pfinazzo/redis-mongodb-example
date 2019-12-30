const bcrypt = require('bcrypt');

function createHash(string) {
  try {
    return bcrypt.hashSync(string, process.env.SALT_ROUNDS);
  } catch (err) {
    if (err) {
      console.error('there was an error creating your hash');
      console.error(err);
      throw new Error(err.message);
    }
  }
}


module.exports = createHash;