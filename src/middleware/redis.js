const redis = require('redis');

const redisOptions = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || '127.0.0.1',
  password: process.env.REDIS_PASSWORD || '',
};

const client = redis.createClient(redisOptions);

module.exports = client;
