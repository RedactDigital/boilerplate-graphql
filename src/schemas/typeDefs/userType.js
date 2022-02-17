const { GraphQLObjectType } = require('graphql');
const { int, string, date } = require(`${root}/src/schemas/typeDefs/baseTypes`);

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: int,
    oAuthId: string,
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    profileImage: string,
    phone: string,
    dateOfBirth: date,
    country: string,
    verificationCode: string,
    createdAt: date,
    updatedAt: date,
  }),
});

module.exports = UserType;
