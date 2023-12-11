const projectDir = ["sandbox"].includes(process.env.NODE_ENV)
    ?  __dirname + '/../sandbox/'
    : __dirname + '/../../../../';

const config = require(`${projectDir}sequelize.js`);

module.exports = {
    ...config,
    seederStorage: "sequelize"
}