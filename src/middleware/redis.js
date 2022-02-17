const redis = require('redis');

const redisOptions = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
};

const client = redis.createClient(redisOptions);

client.on('error', err => {
  log.critical(err);
});

client.on('connect', () => {
  log.info('Redis connected...');
});

module.exports = client;
