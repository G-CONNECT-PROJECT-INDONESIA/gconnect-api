const express = require('express');
const router = express.Router();

const sensorDataController = require('../controllers/sensordata.controller');

// Get all sensor data
router.get('/', sensorDataController.getAllSensorData);

// Get sensor data by id
router.get('/:id', sensorDataController.getSensorDataById);

// Get sensor data by node id
router.get('/node/:nodeId', sensorDataController.getSensorDataByNodeId);

// Get sensor data for specific year, can be used 1, 2, 3 or mode year
// router.get('/year/:year', sensorDataController.getSensorDataByYear);

// Get sensor data for specific year and month
// router.get('/year/:year/month/:month', sensorDataController.getSensorDataByYearAndMonth);

// Get sensor data for specific year and day
// router.get('/year/:year/day/:day', sensorDataController.getSensorDataByYearAndDay);

// Get sensor data for specific year, month and day
// router.get('/year/:year/month/:month/day/:day', sensorDataController.getSensorDataByYearMonthAndDay);

// Get sensor data for specific month
// router.get('/month/:month', sensorDataController.getSensorDataByMonth);

// Get sensor data for specific month and day
// router.get('/month/:month/day/:day', sensorDataController.getSensorDataByMonthAndDay);

// Get sensor data for specific day
// router.get('/day/:day', sensorDataController.getSensorDataByDay);

// Create new sensor data
router.post('/', sensorDataController.createSensorData);

// Update sensor data by id
// router.put('/:id', sensorDataController.updateSensorDataById);

// Delete sensor data by id
// router.delete('/:id', sensorDataController.deleteSensorDataById);

module.exports = router;