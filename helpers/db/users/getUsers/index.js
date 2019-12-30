const { User } = require('../../../../models');

function getUsers(payload = {}) {
    return User.find(payload);
}

module.exports = getUsers;