'use strict';
const {
    Model
} = require('sequelize');
const { ENABLED, DISABLED} = require("../constants/status");
module.exports = (sequelize, DataTypes) => {
    class Config extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Config.init({
        name: DataTypes.STRING,
        value: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM,
            values: [ ENABLED, DISABLED ],
            defaultValue: ENABLED
        }
    }, {
        sequelize,
        modelName: 'Config',
        tableName: 'config',
        underscored: true
    });
    return Config;
};