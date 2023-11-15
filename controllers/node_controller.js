const db = require("../config/db_config");
const Node = db.node;

exports.createNode = async (req, res) => {
    try {
        const node = {
            gateway_name: req.body.gateway_name,
            node_id: req.body.node_id,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            windspeed: req.body.windspeed,
            rainfall: req.body.rainfall,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            roll: req.body.roll,
            pitch: req.body.pitch,
            batteryStatus: req.body.batteryStatus,
            dangerStatus: req.body.dangerStatus,
        };

        const newNode = await Node.create(req.body);

        const response = {
            message: "Node created successfully",
            node: newNode,
        };

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
    const node_id = req.params.node_id;

    const limit = parseInt(req.query.limit) || 10;

    try {
        const node = await Node.findAll({
            where: { node_id },
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
    const node_id = req.params.node_id;
    console.log(node_id);

    try {
        const nodeData = await Node.find(node_id, {
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

exports.getNodebyNodeIdTime = async (req, res) => {
    const node_id = req.params.node_id;
    const from = req.params.from;
    const hours = req.params.hours;

    // Calculate the start and end timestamps based on the provided values
    const startTimestamp = new Date(from);
    const endTimestamp = new Date(
        startTimestamp.getTime() + hours * 60 * 60 * 1000,
    );

    try {
        const nodeData = await Node.findAll({
            where: {
                node_id,
                createdAt: {
                    [Op.between]: [startTimestamp, endTimestamp],
                },
            },
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