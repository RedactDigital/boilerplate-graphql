const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema } = graphql;
const queries = require(`${root}/src/schemas/resolvers/queries`);
const mutations = require(`${root}/src/schemas/resolvers/mutations`);

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...queries,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...mutations,
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
