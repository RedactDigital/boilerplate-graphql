const jwt = require('jsonwebtoken');
const fs = require('fs');
const geoip = require('geoip-lite');

const pathToKey = `${root}/config/keys/private.pem`;
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

module.exports = function issueJWT(user, ipAddress) {
  const { id } = user;
  const geoLocation = geoip.lookup(ipAddress);

  const options = {
    expiresIn: process.env.JWT_EXPIRATION || '2w',
    algorithm: process.env.JWT_ALGORITHM,
    issuer: process.env.API_URL,
    audience: process.env.APP_URL,
  };

  const payload = {
    sub: id,
    iat: day().unix(),
    ip: ipAddress,
    geoLocation,
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, options);

  return {
    token: signedToken,
  };
};
