const { User } = require('../../../../models');

function createUser(userPayload) {
  return new Promise((res, rej) => {
    User.create(userPayload, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    })
  })
}

module.exports = createUser;