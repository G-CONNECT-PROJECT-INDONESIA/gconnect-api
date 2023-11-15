const express = require("express");
const router = express.Router();
const nodeController = require("./node_controller");
const gatewayController = require("./gateway_controller");

// default route
router.get("/", (req, res) => {
    res.send("Hello World");
});

// Node routes
router.post("/nodes", nodeController.createNode);
router.get("/nodes", nodeController.getAllNodes);
router.get("/nodes/:id", nodeController.getNodeById);
router.put("/nodes/:id", nodeController.updateNodebyId);
router.delete("/nodes/:id", nodeController.deleteNodebyId);
router.get("/nodes/nodeId/:node_id", nodeController.getNodebyNodeId);
// router.get("/nodes/nodeId/:node_id/:from/:hours", nodeController.getNodebyNodeIdTime)
// router.get('/nodes/:nodeId/data', nodeController.getNodeData);

// Gateway routes
router.post("/gateways", gatewayController.createGateway);
router.get("/gateways", gatewayController.getAllGateways);
router.get("/gateways/:gatewayName", gatewayController.getGatewayByName);
router.put("/gateways/:gatewayName", gatewayController.updateGateway);
router.delete("/gateways/:gatewayName", gatewayController.deleteGateway);

module.exports = router;
