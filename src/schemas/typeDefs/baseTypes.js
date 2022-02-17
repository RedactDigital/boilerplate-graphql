const { GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLScalarType } = require('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return day(value).format('DD MMM YYYY hh:mm:ss A');
  },
  parseValue(value) {
    return day(value).format('YYYY-MM-DD HH:mm:ss');
  },
  parseLiteral(ast) {
    return day(ast.value).format('YYYY-MM-DD HH:mm:ss');
  },
});

const id = { type: GraphQLID };
const int = { type: GraphQLInt };
const string = { type: GraphQLString };
const boolean = { type: GraphQLBoolean };
const date = { type: dateScalar };

module.exports = {
  id,
  int,
  string,
  boolean,
  date,
};
