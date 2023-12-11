'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
        'endpoints',
        'request_method',
        {
            after: "verb",
            type: Sequelize.STRING,
            allowNull: true,
        }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('endpoints', 'request_method');
  }

};
