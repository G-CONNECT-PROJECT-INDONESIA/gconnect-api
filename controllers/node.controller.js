const db = require('../config/db.config');
const Node = db.node;

exports.createNode = async (req, res) => {
  try {
    const node = {
      gatewayName: req.body.gatewayName,
      nodeId: req.body.nodeId,
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      windspeed: req.body.windspeed,
      rainfall: req.body.rainfall,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      imuRoll: req.body.imuRoll,
      imuPitch: req.body.imuPitch,
      batteryStatus: req.body.batteryStatus,
      dangerStatus: req.body.dangerStatus,
    };
    
    const newNode = await Node.create(req.body);
    
    const response = {
      message: 'Node created successfully',
      node: newNode,
    }

    // console.log(JSON.stringify(response));

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllNodes = async (req, res) => {
  try {
    const nodes = await Node.findAll();

    const response = {
      message: "All nodes retrieved successfully",
      nodes: nodes,
    };

    // console.log(JSON.stringify(response));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNodeById = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const node = await Node.findByPk(id);
    if (!node) {
      return res.status(404).json({ message: "Node not found" });
    }

    const response = {
      message: "Node retrieved successfully",
      node: node,
    };
    console.log(JSON.stringify(response));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNodebyId = async (req, res) => {
  const id = req.params.id;

  try {
    const node = await Node.findByPk(id);
    if (!node) {
      return res.status(404).json({ message: "Node not found" });
    }

    const newNode = await node.update(req.body);
    const response = {
      message: "Node updated successfully",
      node: newNode,
    };
    console.log(JSON.stringify(response));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNodebyId = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Node.destroy({ where: { id } });
    if (num === 1) {
      res.status(204).json({ message: "Node deleted successfully" });
    } else {
      res.status(404).json({ message: "Node not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNodebyNodeId = async (req, res) => {
  const nodeId = req.params.nodeId;

  // get the limit value from the query string, convert to integer
  const limit = parseInt(req.query.limit) || 10;

  try {
    // get the latest data from the database
    const node = await Node.findAll({
      where: { nodeId },
      order: [["createdAt", "DESC"]],
      limit: limit,
    });

    if (!node) {
      return res.status(404).json({ message: "Node not found" });
    }

    const response = {
      message: "Node retrieved successfully",
      node: node,
    };

    console.log(JSON.stringify(response));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNodeData = async (req, res) => {
  const nodeId = req.params.nodeId;
  console.log(nodeId);

  try {
    const nodeData = await Node.find(nodeId, {
      attributes: ["temperature", "rainfall"],
    });

    if (!nodeData) {
      return res.status(404).json({ message: "Node data not found" });
    }

    const response = {
      message: "Node data retrieved successfully",
      nodeData: nodeData,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};