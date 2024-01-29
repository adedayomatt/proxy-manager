'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('endpoints', 'params', 'variables');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('endpoints', 'variables', 'params');
  }
};
