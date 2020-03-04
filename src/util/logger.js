'use strict';

const winston = require('winston');
const {File, Console} = winston.transports;
const winstonLogger = winston.createLogger({
  level: 'info',
});

if (process.env.NODE_ENV === 'production') {
  const fileFormat = winston.format.combine(winston.format.timestamp(), winston.format.json());

  const errTransport = new File({
    filename: './logs/error.log',
    format: fileFormat,
    level: 'error',
  });

  const infoTransport = new File({
    filename: './logs/combined.log',
    format: fileFormat,
  });

  winstonLogger.add(errTransport);
  winstonLogger.add(infoTransport);
} else {
  const errorStackFormat = winston.format(info => {
    if (info.stack) {
      console.log(info.stack);
      return false;
    }
    return info;
  });

  const consoleTransport = new Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
      errorStackFormat(),
    ),
  });

  winstonLogger.add(consoleTransport);
}

module.exports = winstonLogger;
