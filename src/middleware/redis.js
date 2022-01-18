const redis = require('redis');

const redisOptions = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_URL || '127.0.0.1',
  password: process.env.REDIS_PASSWORD || '',
};

const client = redis.createClient(redisOptions);

client.on('error', e => {
  this.logger.critical('Error:', e);
});

client.on('connect', () => {
  this.logger.info(`Redis server connected...`);
});

module.exports = client;
