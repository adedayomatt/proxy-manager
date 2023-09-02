const { Tenant, Endpoint } = require("../models");

module.exports = {
    home: (req, res) => {
        Tenant.findAll({ include: ["endpoints"] })
        .then(tenants => {
            res.render('index', { title: 'Gateway', tenants });
        })
    }

}