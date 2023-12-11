const { database } = require("./config");
const env = process.env.NODE_ENV || "development"
module.exports = {
  host: database.connection.host,
  username: database.connection.username,
  password: database.connection.password,
  database: database.connection.database,
  dialect: database.connection.dialect,
  seederStorage: database.seeder.storage
}