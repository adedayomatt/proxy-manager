const { Tenant, RequestLog } = require("../models");

module.exports = {
    home: (req, res) => {
        Tenant.findAll({ include: ["endpoints"] })
        .then(tenants => {
            res.render('index', { title: 'Gateway', tenants });
        })
    },

    getRequestLog: (req, res) => {
        const { id } =  req.query;
        if(!id) return res.render('log');
        RequestLog.findOne({
            where: { id },
            include: ['external_requests']
        }).then(request => {
            res.render('log', { id, request: request ? request.toJSON() : null });
        }).catch(e => {
            console.log("Err--->", e)
        })
    }
}