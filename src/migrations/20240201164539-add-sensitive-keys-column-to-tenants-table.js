'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tenants', 'sensitive_keys', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "config"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('tenants', 'sensitive_keys');
  }
};
