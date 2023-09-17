const db = require("../config/db.config");
const Gateway = db.gateway;

exports.createGateway = async (req, res) => {
  try {
    const gateway = {
      gatewayName: req.body.gatewayName,
      nodeList: req.body.nodeList,
      location: req.body.location,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      status: req.body.status,
      description: req.body.description,
    };

    console.log(gateway);

    const newGateway = await Gateway.create(gateway);

    const response = {
      message: "Gateway created successfully",
      gateway: newGateway,
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllGateways = async (req, res) => {
  try {
    const gateways = await Gateway.findAll();

    const response = {
      message: "All gateways retrieved successfully",
      gateways: gateways,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGatewayByName = async (req, res) => {
  const gatewayName = req.params.gatewayName;

  try {
    const gateway = await Gateway.findOne({ where: { gatewayName } });
    if (!gateway) {
      return res.status(404).json({ message: "Gateway not found" });
    }

    const response = {
      message: "Gateway retrieved successfully",
      gateway: gateway,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateGateway = async (req, res) => {
  const gatewayName = req.params.gatewayName;

  try {
    const gateway = await Gateway.findOne({ where: { gatewayName } });
    if (!gateway) {
      return res.status(404).json({ message: "Gateway not found" });
    }

    const newGateway = await gateway.update(req.body);
    const response = {
      message: "Gateway updated successfully",
      gateway: newGateway,
    };

    res.status(200).send(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteGateway = async (req, res) => {
  const gatewayName = req.params.gatewayName;

  try {
    const num = await Gateway.destroy({ where: { gatewayName } });

    if (num === 1) {
      return res.status(204).json({ message: "Gateway deleted successfully" });
    } else {
      return res.status(404).json({ message: "Gateway not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
