const db = require('../config/db.config');
const Node = db.node;

exports.createNode = async (req, res) => {
  try {
    const newNode = await Node.create(req.body);
    res.status(201).json(newNode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNodeData = async (req, res) => {
  const nodeId = req.params.nodeId;

  try {
    const nodeData = await Node.findByPk(nodeId, {
      attributes: ['temperature', 'rainfall'],
    });

    if (!nodeData) {
      return res.status(404).json({ message: 'Node data not found' });
    }

    res.status(200).json(nodeData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllNodes = async (req, res) => {
  try {
    const nodes = await Node.findAll();
    res.status(200).json(nodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNodeById = async (req, res) => {
  const nodeId = req.params.nodeId;

  try {
    const node = await Node.findByPk(nodeId);
    if (!node) {
      return res.status(404).json({ message: 'Node not found' });
    }
    res.status(200).json(node);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNode = async (req, res) => {
  const nodeId = req.params.nodeId;

  try {
    const node = await Node.findByPk(nodeId);
    if (!node) {
      return res.status(404).json({ message: 'Node not found' });
    }

    await node.update(req.body);
    res.status(200).json(node);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNode = async (req, res) => {
  const nodeId = req.params.nodeId;

  try {
    const num = await Node.destroy({ where: { nodeId } });
    if (num === 1) {
      res.status(204).json({ message: 'Node deleted successfully' });
    } else {
      res.status(404).json({ message: 'Node not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


