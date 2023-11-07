const { database } = require("./config");
const env = process.env.NODE_ENV || "development"
module.exports = {
  development: {
    host: database.connection.host,
    username: database.connection.username,
    password: database.connection.password,
    database: database.connection.database,
    dialect: database.connection.dialect,
    seederStorage: database.seeder.storage
  },
  test: {
    host: database.connection.host,
    username: database.connection.username,
    password: database.connection.password,
    database: database.connection.database,
    dialect:  database.connection.dialect,
    seederStorage: database.seeder.storage
  },
  production: {
    host: database.connection.host,
    username: database.connection.username,
    password: database.connection.password,
    database: database.connection.database,
    dialect: database.connection.dialect,
    seederStorage: database.seeder.storage
  }
}[env]