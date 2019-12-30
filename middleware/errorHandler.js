
function errorHandler(statusCode, err, req, res, next) {
  let { message } = err;

  if (!message) {
    console.error('NO MESSAGE IN ERROR');
  }

  if (!statusCode) {
    console.error('NO STATUS CODE SUPPLIED');
  }

  message = `ERR: ${message}`;

  console.error(message);

  return res.status(statusCode).json({ message })
}

module.exports = errorHandler;