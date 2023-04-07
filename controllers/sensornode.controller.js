const { v4: uuidv4 } = require('uuid')
const SensorNode = require('../models/sensornode.model')

// Get all sensor nodes
exports.getAllSensorNodes = async (req, res, next) => {
    try {
        const sensorNodes = await SensorNode.find()
        respone = {
            status: 'success',
            message: 'Sensor nodes retrieved successfully',
            data: sensorNodes
        }
        console.log({status: 'success', message: 'Sensor nodes retrieved successfully'})

        res.status(200)
            .header('Content-Type', 'application/json')
            .header('charset', 'utf-8')
            .json(respone)
    } catch (err) {
        console.log("Error: " + err.message)
        next(err)
    }
}

// Get sensor node by id
exports.getSensorNodeById = async (req, res, next) => {
    try {
        const sensorNode = await SensorNode.findById(req.params.id)
        respone = {
            status: 'success',
            message: 'Sensor node retrieved successfully',
            data: sensorNode
        }
        console.log({status: 'success', message: 'Sensor node retrieved successfully'})

        res.status(200)
            .header('Content-Type', 'application/json')
            .header('charset', 'utf-8')
            .json(respone)
    } catch (err) {
        console.log("Error: " + err.message)
        next(err)
    }
}

// Get sensor node that active status


// Create new sensor node
exports.createSensorNode = async (req, res, next) => {
    try {
        const {name, location, coordinates, description} = req.body
        data = {
            name: name,
            location: location,
            coordinates: coordinates,
            status: 'active',
            description: description,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }

        const sensorNode = new SensorNode(data)
        const result = await sensorNode.save()

        respone = {
            status: 'success',
            message: 'Sensor node created successfully',
            result
        }
        res.status(201)
            .header('Content-Type', 'application/json')
            .header('charset', 'utf-8')
            .json(respone)
    } catch (err) {
        next(err)
    }
}