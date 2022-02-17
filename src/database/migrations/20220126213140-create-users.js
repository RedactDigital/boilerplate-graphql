'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      oAuthId: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(96),
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING(64),
      },
      lastName: {
        type: Sequelize.STRING(64),
      },
      password: {
        type: Sequelize.STRING(64),
      },
      profileImage: {
        type: Sequelize.STRING(64),
      },
      phone: {
        type: Sequelize.STRING(16),
        unique: true,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
      },
      country: {
        type: Sequelize.STRING(64),
      },
      verificationCode: {
        type: Sequelize.STRING(8),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Users');
  },
};
