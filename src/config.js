const projectDir = __dirname + '/../../../../';
const config = require(`${projectDir}sequelize.js`);

module.exports = {
    ...config,
    seederStorage: "sequelize"
}