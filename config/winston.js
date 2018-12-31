// const winston = require("winston");
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const expressWinston = require("express-winston");
const appRoot = require("app-root-path");

const customLogOptions = (filename, level) => {
  return {
    filename: filename,
    level: level,
    format: combine(
      format.splat(),
      format.prettyPrint({
        depth: 5
      })
    ),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
    prettyPrint: true
  }
}


const standardExpressFileOptions = (filename, level) => {
  return {
    level: level,
    transports: [
      new transports.File({ filename: filename })
    ],
    format: combine(
      // format.splat(),
      // format.prettyPrint(),
      format.colorize(),
      format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP req.method: {{req.method}} req.url: {{req.url}} status: {{res.statusCode}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
  }
}

const standardExpressConsoleOptions = (level) => {
  return {
    level: level,
    transports: [
      new transports.Console()
    ],
    format: combine(
      // format.splat(),
      // format.prettyPrint(),
      format.colorize(),
      format.json(),
      format.prettyPrint()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP req.method: {{req.method}} req.url: {{req.url}} status: {{res.statusCode}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
  }
}

/**
 * Create Automatic Express-Winston Loggers
 */

const logPath = {
  express: {
    info: `${appRoot.path}/express_app.log`,
    error: `${appRoot.path}/express_error.log`
  },
  custom: {
    info: `${appRoot.path}/logs/app.log`,
    error: `${appRoot.path}/logs/error.log`
  }
};

const level = {
  info: 'info',
  error: 'error'
};

const expressWinstonLogger = expressWinston.logger(
  standardExpressFileOptions(logPath.express.info, level.info)
);

// expressWinstonLogger.stream = {
//   write: function(message, encoding) {
//     expressWinstonLogger.info(message);
//   }
// };

const expressWinstonErrorLogger = expressWinston.logger(
  standardExpressFileOptions(logPath.express.error, level.error)
);

const expressWinstonConsoleLogger = expressWinston.logger(
  standardExpressConsoleOptions(level.info)
);

/**
 * Create Custom loggers
 */

const logfile = createLogger({
  transports: [
    new transports.File(customLogOptions(logPath.custom.info, level.info)),
    new transports.File(customLogOptions(logPath.custom.error, level.error))
  ],
  exitOnError: false // do not exit on handled exceptions
});


const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});


const inspect = createLogger({
  format: combine(
    label({ label: 'inspect' }),
    timestamp(),
    format.splat(),
    myFormat
  ),
  transports: [new transports.Console()]
});


module.exports = {
  expressWinstonLogger,
  expressWinstonConsoleLogger,
  expressWinstonErrorLogger,
  logfile,
  inspect
};
