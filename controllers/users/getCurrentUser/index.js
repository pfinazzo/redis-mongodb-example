const { decodeToken } = require('../../../services/tokenService');
const { User } = require('../../../models');

async function getCurrentUser(req, res, next) {
  try {

    const {
      token = null,
    } = req.signedCookies || {};

    if (!token) {
      return next(400, { message: 'you must provide a token in order to get your currentuser' });
    }

    const userData = decodeToken(token);

    const {
      _id = null,
    } = userData || {};

    if (!_id) {
      throw new Error('there was no _id field found on the decoded user data')
    }

    const userFromDatabase = { ...await User.findById(_id) };
    delete userFromDatabase.password;

    return res.send(userFromDatabase);

  } catch (err) {
    if (err) {
      console.error(err);
      return next(500, err);
    }
  }
}

module.exports = getCurrentUser;