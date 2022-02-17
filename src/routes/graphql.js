const { Router } = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require(`${root}/src/schemas/resolvers`);

const graphql = new Router();

module.exports = graphql.use(
  '/api',
  graphqlHTTP(req => ({
    schema,
    context: {
      user: req.user,
    },
  }))
);
