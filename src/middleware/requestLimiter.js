module.exports = () => {
  const RateLimit = require('express-rate-limit');
  const RedisStore = require('rate-limit-redis');

  const client = require('@middleware/redis');

  const limiter = new RateLimit({
    store: new RedisStore({ client, prefix: 'rate-limit:' }),
    max: process.env.REQUEST_LIMIT,
    windowMs: process.env.THROTTLE_PERIOD,
    message: { success: false, msg: 'Too many requests' },
  });
  return limiter;
};
