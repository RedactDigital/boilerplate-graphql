const jwt = require('jsonwebtoken');
const geoip = require('geoip-lite');
const { decrypt } = require(`${root}/src/middleware/encryption`);
const { OAuthClient } = require(`${root}/src/database/models`);

const privateKey = OAuthClient.findOne({
  where: {
    public: false,
    revoked: false,
    type: 'password',
  },
});

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

  const signedToken = jwt.sign(payload, decrypt(privateKey), options);

  return {
    token: signedToken,
  };
};
