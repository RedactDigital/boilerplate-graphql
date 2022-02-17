'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = sequelize => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }
  Users.init(
    {
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
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Users',
      defaultScope: {
        attributes: {
          exclude: ['password', 'verificationCode'],
        },
        //   include: [
        //     {
        //       model: sequelize.models.Conversation,
        //       as: 'Conversations',
        //     },
        //   ],
      },
    }
  );
  return Users;
};
