require('dotenv').config({ silent: true });
const express = require('express');
const app = express();
const toobusy = require('toobusy-js');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const { graphqlHTTP } = require('express-graphql');

app
  // If the request is taking too long, send a 503 response
  .use((req, res, next) => {
    if (toobusy()) res.status(503).json({ success: false, msg: 'Server too busy' });
    next();
  })
  .set('trust proxy', 1) // trust first proxy

  // Middleware before every route
  .use(
    helmet({ contentSecurityPolicy: process.env.ENV === 'production' ? undefined : false }), // Helmet helps you secure your Express apps by setting various HTTP headers
    cors(), // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
    passport.initialize(), // Passport is a Node.js middleware for authenticating users
    express.json(), // Express json middleware parses the JSON object in the request body and makes it available on req.body
    express.urlencoded({ extended: false }), // Express url encoded middleware parses the URL-encoded data and makes it available on req.body
    express.static(path.join(__dirname, '../public')) // Express static middleware serves files from a given root directory
  );

const schema = require('./schemas');

app.use(
  '/',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

module.exports = app;
