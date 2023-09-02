const { Tenant, Endpoint } = require("../models");

module.exports = {

    createTenant: (req, res) => {
        res.render('tenant/create');
    },

    showTenant: (req, res) => {
        const { id } = req.params;
        Tenant.findByPk(id, { include: ["endpoints"] })
        .then(tenant => {
            res.render('tenant/show', { tenant })
        })
        .catch( e => {
            throw e;
        })
    },

    storeTenant: (req, res) => {
        Tenant.create({ name, slug, base_url, registry, config } = req.body)
        .then(tenant => {
            res.render('route', { route: "/", frame: `/tenant/${tenant.id}`});
        })
        .catch( e => {
            throw e;
        })
    },

    editTenant: (req, res) => {
        const { id } = req.params;
        Tenant.findByPk(id)
        .then( tenant => {
            res.render('tenant/edit', { tenant });
        })
        .catch( e => {
            throw e;
        })
    },


    updateTenant: (req, res) => {
        const { id } = req.params;
        Tenant.update({ name, slug, base_url, registry, config } = req.body, {
            where: { id }
        })
        .then(() => {
            res.render('route', { route: "/", frame: `/tenant/${id}`});
        })
        .catch( e => {
            throw e;
        })
    },

}