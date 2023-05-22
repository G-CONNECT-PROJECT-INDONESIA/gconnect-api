const express = require('express')
const router = express.Router()

const sensorNodeController = require('../controllers/sensornode.controller')

// Get all sensor nodes that limit
router.get('/', sensorNodeController.getAllSensorNodes)

// Get sensor node by id
router.get('/:id', sensorNodeController.getSensorNodeById)

// Get sensor node by name
router.get('/name/:name', sensorNodeController.getSensorNodeByName)

// Create new sensor node
router.post('/', sensorNodeController.createSensorNode)

// // Update sensor node by id
router.put('/:id', sensorNodeController.updateSensorNodeById)

// // Delete sensor node by id
router.delete('/:id', sensorNodeController.deleteSensorNodeById)

module.exports = router