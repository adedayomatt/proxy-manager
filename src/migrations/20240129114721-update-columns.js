'use strict';

const { TEXT} = require("sequelize");

const tables = [
  {
    table: 'request_logs',
    column: 'endpoint',
  },
  {
    table: 'request_logs',
    column: 'response',
  },
  {
    table: 'request_logs',
    column: 'request',
  },
  {
    table: 'external_requests',
    column: 'endpoint',
  },
  {
    table: 'external_requests',
    column: 'payload',
  },
  {
    table: 'external_requests',
    column: 'response',
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all(tables.map(table => {
      return queryInterface.changeColumn(table.table, table.column, {
        type: TEXT('long')
      })
    }))
  },

  async down (queryInterface, Sequelize) {

  }
};
