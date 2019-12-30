const { createUser } = require('../../../helpers/db/users');
const { clearCacheKey } = require('../../../config/cache');
const { createHash } = require('../../../services/cryptoService');
const { createToken } = require('../../../services/tokenService');

async function create(req, res, next) {
  try {
    /* === EXTRACT THE DATA === */
    const {
      name = null,
      email = null,
      password = null,
    } = req.body || {};

    /* === VALIDATE THE DATA === */

    if (!name) {
      return next(400, { message: 'sorry you did not provide a name parameter in your request body' });
    }

    if (!email) {
      return next(400, { message: 'sorry you did not provide an email parameter in your request body' });
    }
    
    if (!password){
      return next(400, { message: 'sorry you did not proviode a password parameter'});
    }

    /* === HASH THE PASSWORD === */

    const hashedPassword = createHash(password);

    /* === CREATE THE PAYLOAD === */
    const userPayload = {
      name,
      email,
      password: hashedPassword,
    }

    /* === CREATE NEW DOCUMENT IN MONGODB */
    const userInstance = await createUser(userPayload);

    /* === CLEAR THE CACHE FOR THAT USER === */
    clearCacheKey(userInstance._id);
    
    /* === REMOVE THE PASSWORD FROM THE DATA WE SEND BACK */
    const userDataToSendBack = { ...userInstance };
    delete userDataToSendBack.password;
    /* === CREATE THE JSON WEB TOKEN === */
    const token = createToken(userDataToSendBack);

    /* === RESPOND WITH A SECURE HTTP ONLY COOKIE === */
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    });
    /* === SEND BACK THE USER DATA === */
    return res.send(userDataToSendBack);

  } catch (err) {
    if (err) {
      next(500, err);
    }
  }
}

module.exports = create;

