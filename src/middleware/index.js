const requestLimiter = require(`${root}/src/middleware/requestLimiter`);
const log = require(`${root}/src/middleware/logger`);
const client = require(`${root}/src/middleware/redis`);

module.exports = {
  requestLimiter,
  log,
  client,
};
