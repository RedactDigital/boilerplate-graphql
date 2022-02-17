'use strict';
const { hash } = require('bcrypt');
const day = require('dayjs');

module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Users', [
      {
        oAuthId: null,
        email: 'jon.doe@email.com',
        firstName: 'Jon',
        lastName: 'Doe',
        password: await hash('password', Number(process.env.SALT_ROUNDS)),
        profileImage: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        phone: '+1 555 555 5555',
        dateOfBirth: '1995-01-01',
        country: 'US',
        verificationCode: 12346578,
        createdAt: day().format(),
        updatedAt: day().format(),
      },
      {
        oAuthId: null,
        email: 'marry.jane@email.com',
        firstName: 'Marry',
        lastName: 'Jane',
        password: await hash('password', Number(process.env.SALT_ROUNDS)),
        profileImage: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        phone: '+1 555 555 5556',
        dateOfBirth: '1995-01-01',
        verificationCode: 12346578,
        country: 'US',
        createdAt: day().format(),
        updatedAt: day().format(),
      },
    ]);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
