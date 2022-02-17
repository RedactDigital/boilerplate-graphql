const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const client = require(`${root}/src/middleware/redis`);

module.exports = rateLimit({
  store: new RedisStore({ client }),
  max: process.env.REQUEST_LIMIT,
  windowMs: process.env.REQUEST_PERIOD * 60 * 1000, // converts minutes to milliseconds
  message: { success: false, msg: 'Too many requests' },
});
