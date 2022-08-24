const pinoLogger = require('pino');

module.exports = pinoLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
});
