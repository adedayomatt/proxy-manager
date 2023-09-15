const express = require('express');
const createError = require("http-errors");
const swaggerUi = require('swagger-ui-express');
const { exampleSetup, getTenantsSetup } = require("@adedayomatthews/swagger-generator");
const models = require("./models");
const routes = require("./routes/index")
const path = require("path");

class ProxyManager {

    config = {}
    views = []
    constructor(app, config = {}) {
        this.config = config;
        this.setModels(models);
        this.setApp(app);
    }
    getModels() {
        return this.models;
    }
    setModels(models) {
        this.models = models
    }
    syncModels(options = {}) {
        return this.getModels().sequelize.sync(options)
    }
    setApp(app) {
        if(!app) return this;
        this.app = app;
        this.app.use(express.static(path.join(__dirname, 'public')));
        return this.addViewDirectories([path.join(__dirname, 'views')])
            .setApplicationProperty('view engine', 'jade')
    }
    addViewDirectories(dir = []) {
        return this.setApplicationProperty("views", this.views.concat(dir))
    }
    setApplicationProperty(key, value){
        this.app.set(key, value)
        return this;
    }
    addDocumentation(){
        this.app.use("/doc/:tenant?", async (req, res, next) => {
            const { Tenant, Config  } = this.models;
            const { gateway } = this.config;
            const identifier = req.params.tenant;
            let setupDoc = null;
            if(identifier === "example") {
                setupDoc = exampleSetup;
            } else {
                let tenants = (await Tenant.findAll({
                    where: identifier !== "all" ? { id: identifier } : undefined,
                    include: ["endpoints"],
                })).map(tenant => tenant.toJSON());
                let config =  await Config.findOne({ where: { name: "gateway_swagger_config" } });
                config =  config ? config.value : null;
                setupDoc = getTenantsSetup(tenants, {
                    ...gateway,
                    ...(config ? JSON.parse(config) : {})
                });
            }
            if(setupDoc) {
                return res.render('doc', { setupDoc });
            }
            next(createError(404))
        });
        return this;
    }
    getManagementRouter() {
        return routes;
    }
}

module.exports = ProxyManager;