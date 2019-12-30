/* ======= IMPORT THE DEPENDENCIES ======= */
const express = require('express');
const dotenv = require('dotenv');

/* ===== CREATE EXPRESS APP ==== */
const app = express();

/* ====== IMPORT ROUTES AND MIDDLEWARE ====== */
const routes = require('./routes');
const { allRoutesMiddleware, errorHandler } = require('./middleware');

/* ======= CONFIGURE ENVIRONMENT ======= */
dotenv.config();

console.log('NODE ENV => ', process.env.NODE_ENV);
/* ======= CONNECT TO THE DATABASE ======= */
require('./config/database');

/* ======= CONFIGURE CACHE ======= */
require('./config/cache');

/* ====== MOUNT THE MIDDLEWARE ====== */
app.use(allRoutesMiddleware);

/* ====== MOUNT THE ROUTES ======= */
app.use(routes);
app.use(errorHandler);



/* ======== EXPORT THE EXPRESS APP ========= */
module.exports = app;
