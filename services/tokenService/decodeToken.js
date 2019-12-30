const { verify } = require('jsonwebtoken');

function decodeToken(token) {
  try {
    return verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err) {
      console.error('could not parse your token');
      console.error(err);
      throw new Error(err.message);
    }
  }
}

module.exports = decodeToken;