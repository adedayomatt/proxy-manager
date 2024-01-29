const { Tenant, Endpoint } = require("../models");

module.exports = {

    createEndpoint: (req, res) => {
        Tenant.findAll()
        .then(tenants => {
            res.render('endpoint/create', { tenants });
        })
        .catch(e => {
            throw e;
        })
    },

    storeEndpoint: (req, res) => {
        Endpoint.create({
            tenant_id, name, slug, route, verb, request_method,
            description, type, query, headers, variables,
            payload, response, onfail, response_check, before_execute, after_execute
        } = req.body)
        .then(endpoint => {
            res.render('route', { route: "/", frame: `/tenant/${req.body.tenant_id}`});
        })
        .catch( e => {
            throw e;
        })
    },

    editEndpoint: (req, res) => {
        const { id } = req.params;
        Promise.all([Tenant.findAll(), Endpoint.findByPk(id)])
        .then( ([ tenants, endpoint ]) => {
            res.render('endpoint/edit', { tenants, endpoint });
        })
        .catch( e => {
            throw e;
        })
    },

    updateEndpoint: (req, res) => {
        const { id } = req.params;

        Endpoint.update({
            tenant_id, name, slug, route, verb, request_method,
            description, type, query, headers, variables,
            payload, response, onfail, response_check, before_execute, after_execute
        } = req.body, {
            where: { id }
        })
        .then(() => {
            res.render('route', { route: "/", frame: `/tenant/${req.body.tenant_id}`});
        })
        .catch( e => {
            throw e;
        })
    },

}