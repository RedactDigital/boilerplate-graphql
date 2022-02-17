const path = require('path');
const dayjs = require('dayjs');

root = path.resolve(__dirname, '../');

const { log: logger } = require(`${root}/src/middleware`);

day = dayjs;
log = logger;

module.exports = {
  global,
};
