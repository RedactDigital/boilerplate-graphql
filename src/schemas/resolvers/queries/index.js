const getAllUsers = require(`${root}/src/schemas/resolvers/queries/users/getAllUsers`);
const getUserById = require(`${root}/src/schemas/resolvers/queries/users/getUserById`);

module.exports = {
  getAllUsers,
  getUserById,
};
