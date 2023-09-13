const express = require('express');
const router = express.Router();
const nodeController = require('../controllers/node.controller');
const gatewayController = require('../controllers/gateway.controller');

// Node routes
router.post('/nodes', nodeController.createNode);
router.get('/nodes', nodeController.getAllNodes);
router.get('/nodes/:nodeId', nodeController.getNodeById);
router.put('/nodes/:nodeId', nodeController.updateNode);
router.delete('/nodes/:nodeId', nodeController.deleteNode);
router.get('/nodes/:nodeId/data', nodeController.getNodeData);

// Gateway routes
router.post('/gateways', gatewayController.createGateway);
router.get('/gateways', gatewayController.getAllGateways);
router.get('/gateways/:gatewayName', gatewayController.getGatewayByName);
router.put('/gateways/:gatewayName', gatewayController.updateGateway);
router.delete('/gateways/:gatewayName', gatewayController.deleteGateway);

module.exports = router;
