const { Strategy, ExtractJwt } = require('passport-jwt');
// const fs = require('fs');
const { User, OAuthClient } = require(`${root}/src/database/models`);

// const pathToKey = `${root}/config/keys/public.pem`;
// const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const publicKey = OAuthClient.findOne({
  where: {
    public: true,
    revoked: false,
    type: 'password',
  },
});

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey,
  algorithms: [process.env.JWT_ALGORITHM],
  issuer: process.env.API_URL,
  audience: process.env.APP_URL,
};

// index.js will pass the global passport object here, and this function will configure it
module.exports = passport => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new Strategy(jwtOptions, async (tokenPayload, done) => {
      try {
        const user = await User.findByPk(tokenPayload.sub);

        user.ip = tokenPayload.ip;
        user.geoLocation = tokenPayload.geoLocation;

        if (user) return done(null, user);

        return done(null, false);
      } catch (err) {
        log.error('Passport Error: ', err);
        return done(err, false);
      }
    })
  );
};
