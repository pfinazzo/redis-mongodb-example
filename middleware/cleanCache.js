const { clearHash } = require('../config/cache');

function cleanCache(req, res, next) {
  // call route handler
  await next();
  clearHash(req.user.id);
}