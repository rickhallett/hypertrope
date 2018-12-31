const winston = require("winston");
const expressWinston = require("express-winston");
const appRoot = require("app-root-path");

const options = {
  file: {
    filename: `${appRoot.path}/app.log`,
    level: "info",
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.prettyPrint({
        depth: 5
      })
    ),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
    prettyPrint: true
  },
  error: {
    filename: `${appRoot.path}/error.log`,
    level: "error",
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.prettyPrint({
        depth: 5
      })
    ),
    handleExceptions: true,
    json: true,
    colorize: true,
    prettyPrint: true
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.File(options.error)
  ],
  exitOnError: false // do not exit on handled exceptions
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

module.exports = logger;
