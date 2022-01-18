const graphql = require('graphql');
const { GraphQLInt, GraphQLList } = graphql;

const { UserType } = require('../../typeDefs');

const userData = require('../../../../public/dummy-data.json');

module.exports = {
  type: new GraphQLList(UserType),
  args: { id: { type: GraphQLInt } },
  resolve() {
    // remove password from object
    return userData.map(user => {
      // eslint-disable-next-line no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  },
};
