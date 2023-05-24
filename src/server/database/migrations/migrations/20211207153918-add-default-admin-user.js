'use strict';
const bcrypt = require('bcrypt');
const { v4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: v4(),
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('Test1234', bcrypt.genSaltSync()),
        role: 0,
        status: 0,
        name: 'Admin',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', { email: 'admin@gmail.com' }, {});
  }
};
