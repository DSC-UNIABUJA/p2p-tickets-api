'use strict';

const winston = require('winston');
const winstonLogger = winston.createLogger({
  level: 'info',
});

module.exports = winstonLogger;
