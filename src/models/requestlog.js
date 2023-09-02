'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RequestLog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Tenant, ExternalRequest }) {
            RequestLog.belongsTo(Tenant, {
                as: "tenant"
            })
            RequestLog.hasMany(ExternalRequest, {
                as: "external_requests"
            })
        }
    }
    RequestLog.init({
        tenant_id: DataTypes.INTEGER,
        endpoint: DataTypes.STRING,
        method: DataTypes.STRING,
        request: DataTypes.TEXT,
        response: DataTypes.TEXT,
        createdAt: DataTypes.DATE,
        responded_at: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'RequestLog',
        tableName: "request_logs",
        underscored: true
    });
    return RequestLog;
};