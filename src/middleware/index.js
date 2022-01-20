const requestLimiter = require(`${global.rootFolder}/src/middleware/requestLimiter`);
const log = require(`${global.rootFolder}/src/middleware/logger`);
const client = require(`${global.rootFolder}/src/middleware/redis`);

module.exports = {
  requestLimiter,
  log,
  client,
};
