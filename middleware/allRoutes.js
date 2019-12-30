/* ======== IMPORT THE DEPENDENCIES ======= */
const {
  json,
  urlencoded
} = require('express');

const logger = require('morgan');

/* ======== DEFINE THE MIDDLEWARE ===== */
const allRoutesMiddleware = [
  json(),
  urlencoded({ extended: true }),
  logger('dev'),
];

/* ======== MOUNT THE MIDDLE WARE ====== */
module.exports = allRoutesMiddleware;