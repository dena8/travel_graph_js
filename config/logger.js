require("dotenv").config();
const winston = require('winston')
const {format} =require('winston')
const { combine, timestamp, label, prettyPrint } = format;



const options = {
  file: {
    level: 'info',
    filename: './logs/app.log',
    handleExceptions: false,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  errorFile: {
    level: 'error',
    filename: './logs/error.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.simple(),
    colorize: true,
  },
 
};

const logger = winston.createLogger({
    format: combine(
       // label({ label: 'right meow!' }),
       format.splat(),
        timestamp(),
        prettyPrint()
      ),
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    new winston.transports.File(options.errorFile)

  ],
  exitOnError: false
})

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger