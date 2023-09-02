'use strict';
const {
    Model
} = require('sequelize');
const {SUCCESS, FAILED, PENDING} = require("../constants/status");
module.exports = (sequelize, DataTypes) => {
    class ExternalRequest extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ RequestLog }) {
            ExternalRequest.belongsTo(RequestLog, {
                as: "request_log"
            })
        }
    }
    ExternalRequest.init({
        request_log_id: {
            type: DataTypes.INTEGER,
        },
        base_url: {
            type: DataTypes.STRING
        },
        endpoint: {
            type: DataTypes.STRING
        },
        method: {
            type: DataTypes.STRING
        },
        payload: {
            type: DataTypes.TEXT
        },
        response: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.ENUM,
            values: [ SUCCESS, FAILED, PENDING ],
            defaultValue: PENDING
        },
        createdAt: DataTypes.DATE,
        responded_at: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'ExternalRequest',
        tableName: "external_requests",
        underscored: true
    });

    return ExternalRequest;
};