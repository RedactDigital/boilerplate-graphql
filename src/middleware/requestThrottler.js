module.exports = () => {
  const RateLimit = require('express-slow-down');
  const RedisStore = require('rate-limit-redis');
  const client = require('@middleware/redis');

  const throttler = new RateLimit({
    store: new RedisStore({
      client,
      prefix: 'slow-down:',
    }),
    delayAfter: process.env.THROTTLE_DELAY_AFTER,
    delayMs: process.env.THROTTLE_DELAY_LENGTH,
    windowMs: process.env.THROTTLE_PERIOD,
    maxDelayMs: process.env.MAX_THROTTLE_DELAY,
  });
  return throttler;
};
