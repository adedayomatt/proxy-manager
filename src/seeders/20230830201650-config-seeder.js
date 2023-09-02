'use strict';

const { Op} = require("sequelize");
const configs = [
  {
    name: "gateway_swagger_config",
    value: JSON.stringify({
      title: "Eaglet",
      servers: "http://localhost:8000/request"
    }),
    created_at: new Date(),
    updated_at: new Date()
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('config', configs, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('config', {
      [Op.or]: configs.map(c => ({ name: c.name }))
    });
  }
};
