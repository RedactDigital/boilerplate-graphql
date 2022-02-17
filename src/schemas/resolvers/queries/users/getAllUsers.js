const { GraphQLList } = require('graphql');
const { UserType } = require(`${root}/src/schemas/typeDefs`);
const { Users } = require(`${root}/src/database/models`);

module.exports = {
  name: 'getAllUsers',
  type: new GraphQLList(UserType),
  resolve: async () => {
    return await Users.findAll();
  },
};
