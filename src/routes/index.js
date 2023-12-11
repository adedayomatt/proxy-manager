const express = require('express');
const router = express.Router();

const indexController = require('../controllers')
const tenantController = require("../controllers/tenantController")
const endpointController = require("../controllers/endpointController");

router.get('/', indexController.home);

router.get('/tenant/create', tenantController.createTenant )
router.post('/tenant/create', tenantController.storeTenant )
router.get('/tenant/:id', tenantController.showTenant )
router.get('/tenant/:id/edit', tenantController.editTenant )
router.post('/tenant/:id/edit', tenantController.updateTenant )


router.get('/endpoint/create', endpointController.createEndpoint )
router.post('/endpoint/create', endpointController.storeEndpoint )
router.get('/endpoint/:id/edit', endpointController.editEndpoint )
router.post('/endpoint/:id/edit', endpointController.updateEndpoint )

router.get('/log', indexController.getRequestLog)


module.exports = router;
