const { GraphQLInt, GraphQLNonNull } = require('graphql');
const { UserType } = require(`${root}/src/schemas/typeDefs`);
const { Users } = require(`${root}/src/database/models`);

module.exports = {
  name: 'getUserById',
  type: new GraphQLNonNull(UserType),
  args: { id: { type: GraphQLInt } },
  resolve: async (parent, args) => {
    if (!args.id) {
      throw new Error('No id provided');
    }
    return await Users.findByPk(args.id);
  },
};
