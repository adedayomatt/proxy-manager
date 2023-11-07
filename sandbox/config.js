module.exports = {
    app_name: "Gateway Specification",
    app_env: process.env.NODE_ENV,
    database: {
        connection: {
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            dialect: process.env.DB_DIALECT,
            port: process.env.DB_PORT
        },
        seeder: {
            storage: "sequelize"
        }
    },
    gateway: {
        title: process.env.GATEWAY_TITLE,
        servers: process.env.GATEWAY_SERVERS,
        externalDoc: {
            url: process.env.GATEWAY_EXTERNAL_DOC_URL,
            description: process.env.GATEWAY_EXTERNAL_DOC_DESCRIPTION
        }
    }
}