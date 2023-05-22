const { v4: uuidv4 } = require('uuid')

const db = require('../config/db.config')
const SensorNode = db.sensornode

// respone for get All sensor nodes
const sendRespone = async (sensorNodes, req, res) => {
    respone = {
        status: 'success',
        message: 'Sensor nodes retrieved successfully',
        data: sensorNodes.map(sensorNode => {
            return sensorNode.dataValues
        })
    }
    console.log(`[${Date.now()}] ${req.method} ${req.originalUrl} ${JSON.stringify(respone)}`)
    res.status(200)
        .header('Content-Type', 'application/json')
        .header('charset', 'utf-8')
        .json(respone)
}

// Get all sensor nodes
exports.getAllSensorNodes = async (req, res, next) => {
    const status = req.query.status
    
    if (status) {
        await SensorNode.findAll({
            where: {
                status: status
            }
        }).then(sensorNodes => {
            sendRespone(sensorNodes, req, res)
            return
        }).catch((err) => {
            console.log("Error: " + err.message)
            next(err)
        })
    } else {
        await SensorNode.findAll().then(sensorNodes => {
            sendRespone(sensorNodes, req, res)
            return
        }).catch((err) => {
            console.log("Error: " + err.message)
            next(err)
        })
    }
}

// Get sensor node by id
exports.getSensorNodeById = async (req, res, next) => {
    await SensorNode.findByPk(req.params.id).then(sensorNode => {
        respone = sensorNode ? {
            status: 'success',
            message: 'Sensor node retrieved successfully',
            nodeId: req.params.id,
            data: sensorNode
        } : {
            status: 'not found',
            message: 'Sensor node not found',
        }
        console.log(`[${Date.now()}] ${req.method} ${req.originalUrl} ${JSON.stringify(respone)}`)
        
        const code = sensorNode ? 200 : 404

        res.status(code)
            .header('Content-Type', 'application/json')
            .header('charset', 'utf-8')
            .json(respone)
    }).catch((err) => {
        console.log("Error: " + err.message)
        next(err)
    })
}

exports.getSensorNodeByName = async (req, res, next) => {
    await SensorNode.findOne({
        where: {
            nodeName: req.params.name
        }
    }).then(sensorNode => {
        respone = sensorNode ? {
            status: 'success',
            message: 'Sensor node retrieved successfully',
            nodeName: req.params.name,
            data: sensorNode
        } : {
            status: 'not found',
            message: 'Sensor node not found',
        }

        console.log(`[${Date.now()}] ${req.method} ${req.originalUrl} ${JSON.stringify(respone)}`)

        const code = sensorNode ? 200 : 404

        res.status(code)
            .header('Content-Type', 'application/json')
            .header('charset', 'utf-8')
            .json(respone)
    }).catch((err) => {
        console.log("Error: " + err.message)
        next(err)
    })
}

// Create new sensor node
exports.createSensorNode = async (req, res, next) => {
    const {
        nodeName,
        location,
        latitude,
        longitude,
        description
    } = req.body

    data = {
        nodeId: uuidv4(),
        nodeName: nodeName,
        location: location,
        latitude: latitude,
        longitude: longitude,
        description: description,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    }

    await SensorNode.create(data).then(sensorNode => {
        // Create sensor node successfully
        respone = {
            status: 'success',
            message: 'Sensor node created successfully',
            data: sensorNode
        }
        console.error(`[${Date.now()}] ${req.method} ${req.originalUrl} ${response}`)
        res.status(201)
            .header('Content-Type', 'application/json')
            .header('charset', 'utf-8')
            .json(respone)
        
    }).catch((err) => {
        // Error while creating sensor node
        console.error(`[${Date.now()}] ${req.method} ${req.originalUrl} ${err.message}`)
        next(err)
    })
}

// Update sensor node by id
exports.updateSensorNodeById = async (req, res, next) => {
    const {
        nodeName,
        location,
        latitude,
        longitude,
        description
    } = req.body

    nodeId = req.params.id

    data = {
        nodeName: nodeName, 
        location: location,
        latitude: latitude,
        longitude: longitude,
        description: description,
        updatedAt: Date.now()
    }

    // Check if sensor node exists
    await SensorNode.findByPk(nodeId).then(sensorNode => {
        if (!sensorNode) {
            respone = {
                status: 'not found',
                message: 'Sensor node not found',
                nodeId: nodeId
            }
            console.log(`[${Date.now()}] ${req.method} ${req.originalUrl} ${JSON.stringify(respone)}`)
            res.status(404)
                .header('Content-Type', 'application/json')
                .header('charset', 'utf-8')
                .json(respone)
            return
        }
    }).catch((err) => {
        console.log("Error: " + err.message)
        return
    })

    await SensorNode.update(data, {
        where: {
            nodeId: nodeId
        }
    }).then(() => {
        respone = {
            status: 'success',
            message: 'Sensor node updated successfully',
            nodeId: nodeId,
            data: data
        }
        console.log(`[${Date.now()}] ${req.method} ${req.originalUrl} ${JSON.stringify(respone)}`)
        res.status(200)
            .header('Content-Type', 'application/json')
            .header('charset', 'utf-8')
            .json(respone)
    }).catch((err) => {
        console.log("Error: " + err.message)
        next(err)
    })
}

// Delete sensor node by id
exports.deleteSensorNodeById = async (req, res, next) => {
    nodeId = req.params.id
    
    // Check if sensor node exists
    await SensorNode.findByPk(nodeId).then(sensorNode => {
        if (!sensorNode) {
            respone = {
                status: 'not found',
                message: 'Sensor node not found',
                nodeId: nodeId
            }
            console.log(`[${Date.now()}] ${req.method} ${req.originalUrl} ${JSON.stringify(respone)}`)
            res.status(404)
                .header('Content-Type', 'application/json')
                .header('charset', 'utf-8')
                .json(respone)
            return
        }
    }).catch((err) => {
        console.log("Error: " + err.message)
        return
    })

    // Delete sensor node
    await SensorNode.destroy({
        where: {
            nodeId: nodeId
        }
    }).then(() => {
        respone = {
            status: 'success',
            message: 'Sensor node deleted successfully',
            nodeId: nodeId
        }
        console.log(`[${Date.now()}] ${req.method} ${req.originalUrl} ${JSON.stringify(respone)}`)
        res.status(200)
            .header('Content-Type', 'application/json')
            .header('charset', 'utf-8')
            .json(respone)
    }).catch((err) => {
        console.log("Error: " + err.message)
        next(err)
    })
}
