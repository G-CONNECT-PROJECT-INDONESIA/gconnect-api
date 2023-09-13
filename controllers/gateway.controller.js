const db = require('../config/db.config');
const Gateway = db.gateway;

exports.createGateway = async (req, res) => {
  try {
    const newGateway = await Gateway.create(req.body);
    res.status(201).json(newGateway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllGateways = async (req, res) => {
  try {
    const gateways = await Gateway.findAll();
    res.status(200).json(gateways);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGatewayByName = async (req, res) => {
  const gatewayName = req.params.gatewayName;

  try {
    const gateway = await Gateway.findOne({ where: { gatewayName } });
    if (!gateway) {
      return res.status(404).json({ message: 'Gateway not found' });
    }
    res.status(200).json(gateway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateGateway = async (req, res) => {
  const gatewayName = req.params.gatewayName;

  try {
    const gateway = await Gateway.findOne({ where: { gatewayName } });
    if (!gateway) {
      return res.status(404).json({ message: 'Gateway not found' });
    }

    await gateway.update(req.body);
    res.status(200).json(gateway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteGateway = async (req, res) => {
  const gatewayName = req.params.gatewayName;

  try {
    const num = await Gateway.destroy({ where: { gatewayName } });
    if (num === 1) {
      res.status(204).json({ message: 'Gateway deleted successfully' });
    } else {
      res.status(404).json({ message: 'Gateway not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
