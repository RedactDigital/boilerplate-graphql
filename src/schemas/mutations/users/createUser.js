const graphql = require('graphql');
const { GraphQLString } = graphql;

const { UserType } = require('../../typeDefs');

const userData = require('../../../../public/dummy-data.json');

module.exports = {
  type: UserType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parent, args) {
    userData.push({
      id: userData.length + 1,
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      password: args.password,
    });
    return args;
  },
};
