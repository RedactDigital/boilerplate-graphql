const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const { client } = require(`${global.rootFolder}/src/middleware/redis`);

module.exports = rateLimit({
  store: new RedisStore({ client, prefix: 'rate-limit:' }),
  max: process.env.REQUEST_LIMIT,
  windowMs: process.env.REQUEST_PERIOD,
  message: { success: false, msg: 'Too many requests' },
});
