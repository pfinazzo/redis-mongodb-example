const { User } = require('../../../models');

async function all(req, res, next) {
  try {
    // grab users from the cache
    const { uid = null } = req.query || {};
    const users = await User.find(req.query).cache({ key: uid });
    // send the users back
    return res.send(users);
  } catch (err) {
    if (err) {
      return next(500, err);
    }
  }
}

module.exports = all;