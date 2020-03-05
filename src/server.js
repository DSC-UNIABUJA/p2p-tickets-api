'use strict';
const tslib = require('tslib');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./util/logger');
const apiRouter = require('./routes');
const app = express();

(async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    };
    await mongoose.connect(process.env.DB_URL, options);
  } catch (error) {
    logger.error(error);
    throw error;
  }
})();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (_, res) => res.send({status: true, body: 'Server works'}));

app.use('/api', apiRouter);

module.exports = app;
