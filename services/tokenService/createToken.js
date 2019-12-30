const { sign } = require('jsonwebtoken');

function createToken(payload = {}) {
  try {
    return sign(payload, process.env.JWT_SECRET)
  } catch (err) {
    if (err){
      console.error('there was an error creating your token');
      console.error(err);
      throw new Error(err.message);
    }
  }
}

module.exports = createToken;