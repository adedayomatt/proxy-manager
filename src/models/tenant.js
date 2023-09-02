'use strict';
const {
    Model
} = require('sequelize');
const { ENABLED, DISABLED} = require("../constants/status");
module.exports = (sequelize, DataTypes) => {
    class Tenant extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Endpoint, RequestLog }) {
            Tenant.hasMany(Endpoint, {
                foreignKey: "tenant_id",
                as: "endpoints"
            });
        }
    }
    Tenant.init({
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        base_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        registry: {
            type: DataTypes.TEXT
        },
        config: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.ENUM,
            values: [ ENABLED, DISABLED ],
            defaultValue: ENABLED
        }
    }, {
        sequelize,
        modelName: 'Tenant',
        tableName: "tenants",
        underscored: true
    });

    return Tenant;
};