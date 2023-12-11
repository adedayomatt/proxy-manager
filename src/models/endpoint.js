'use strict';
const { ENABLED, DISABLED } = require("../constants/status")
const { REST, SOAP, GRAPHQL } = require("../constants/requestTypes")
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Endpoint extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Tenant }) {
            Endpoint.belongsTo(Tenant, {
                as: "tenant"
            })
        }
    }
    Endpoint.init({
        tenant_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        before_execute: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        after_execute: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        route: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        verb: {
            type: DataTypes.STRING,
            allowNull: false
        },
        request_method: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM,
            values: [ REST, SOAP, GRAPHQL ],
            defaultValue: REST,
            allowNull: false
        },
        onfail: {
            type: DataTypes.ENUM,
            values: ["Terminate", "Continue", "Retry"],
            defaultValue: "Terminate",
            allowNull: false
        },
        params: {
            type: DataTypes.TEXT
        },
        query: {
            type: DataTypes.TEXT
        },
        payload: {
            type: DataTypes.TEXT
        },
        headers: {
            type: DataTypes.TEXT
        },
        require_authentication: {
            type: DataTypes.STRING,
            default: 0
        },
        response: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.ENUM,
            values: [ ENABLED, DISABLED ],
            defaultValue: ENABLED
        }
    }, {
        sequelize,
        modelName: 'Endpoint',
        tableName: "endpoints",
        underscored: true
    });

    return Endpoint;
};