const projectDir = process.env.npm_lifecycle_event === "sandbox"
    ?  __dirname + '/../sandbox/'
    : __dirname + '/../../../../';

const config = require(`${projectDir}sequelize.js`);

module.exports = {
    ...config,
    seederStorage: "sequelize"
}