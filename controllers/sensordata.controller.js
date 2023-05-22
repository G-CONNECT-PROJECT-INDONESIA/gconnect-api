const { v4: uuidv4 } = require('uuid')

const db = require('../config/db.config')
const { query, response } = require('express')
const SensorData = db.sensordata

const sendRespone = async (sensorData, req, res) => {
  respone = {
    status: 'success',
    message: 'Sensor data retrieved successfully',
    data: sensorData.map(sensorData => {
      return sensorData.dataValues
    })
  }

  console.log(`[${Date.now()}] ${req.method} ${req.originalUrl} ${JSON.stringify(respone)}`)

  res.status(200)
    .header('Content-Type', 'application/json')
    .header('charset', 'utf-8')
    .json(respone)
}

// Get all sensor data
exports.getAllSensorData = async (req, res, next) => {
  const {
    limit, 
    lowertime,
    uppertime,
  } = req.query

  if (limit || lowertime && uppertime) {
    queryList = {
      limit: limit ? limit : 100,
      where: {
        createdAt: {
          [db.Sequelize.Op.between]: [lowertime ? lowertime : 0, uppertime ? uppertime : Date.now()]
        }
      }
    }
    await SensorData.findAll(queryList).then(sensorData => {
      sendRespone(sensorData, req, res)
      return
    }).catch((err) => {
      console.log("Error: " + err.message)
      next(err)
    })
  } else {
    await SensorData.findAll({
      limit: 100
    }).then(sensorData => {
      sendRespone(sensorData, req, res)
      return
    }).catch((err) => {
      console.log("Error: " + err.message)
      next(err)
    })
  }
}

// Get sensor data by id
exports.getSensorDataById = async (req, res, next) => {
  await SensorData.findByPk(req.params.id).then(sensorData => {
    respone = sensorData ? {
      status: 'success',
      message: 'Sensor data retrieved successfully',
      dataId: req.params.id,
      data: sensorData
    } : {
      status: 'not found',
      message: 'Sensor data not found',
    }
    console.log(`[${Date.now()}] ${req.method} ${req.originalUrl} ${JSON.stringify(respone)}`)

    const code = sensorData ? 200 : 404
    res.status(code)
      .header('Content-Type', 'application/json')
      .header('charset', 'utf-8')
      .json(respone)
  }).catch((err) => {
    console.log("Error: " + err.message)
    next(err)
  })
}

// Get sensor data by node id
exports.getSensorDataByNodeId = async (req, res, next) => {
  await SensorData.findAll({
    where: {
      nodeId: req.params.nodeId
    }
  }).then(sensorData => {
    respone = sensorData ? {
      status: 'success',
      message: 'Sensor data retrieved successfully',
      nodeId: req.params.nodeId,
      data: sensorData
    } : {
      status: 'not found',
      message: 'Sensor data not found',
    }
    console.log(`[${Date.now()}] ${req.method} ${req.originalUrl} ${JSON.stringify(respone)}`)

    const code = sensorData ? 200 : 404
    res.status(code)
      .header('Content-Type', 'application/json')
      .header('charset', 'utf-8')
      .json(respone)
  }).catch((err) => {
    console.log("Error: " + err.message)
    next(err)
  })
}

// Get sensor data for specific year
exports.getSensorDataByYear = async (req, res, next) => {
  response = {
    status: 'success',
    message: 'cooming soon',
  }
  res.status(200)
    .header('Content-Type', 'application/json')
    .header('charset', 'utf-8')
    .json(response)
}

// Get sensor data for specific month
exports.getSensorNodeByMonth = async (req, res, next) => {
  response = {
    status: 'success',
    message: 'cooming soon',
  }
  res.status(200)
    .header('Content-Type', 'application/json')
    .header('charset', 'utf-8')
    .json(response)
}

// Create new sensor data
exports.createSensorData = async (req, res, next) => {
  const {
    nodeId,
    temperature,
    humidity,
    windspeed,
    rainfall,
    latitude,
    longitude,
    imuRoll,
    imuPitch,
    batteryStatus,
    dangerStatus
  } = req.body
  
  data = {
    dataId: uuidv4(),
    nodeId: nodeId,
    temperature: temperature,
    humidity: humidity,
    windspeed: windspeed,
    rainfall: rainfall,
    latitude: latitude,
    longitude: longitude,
    imuRoll: imuRoll,
    imuPitch: imuPitch,
    batteryStatus: batteryStatus,
    dangerStatus: dangerStatus,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }

  console.log(data)

  await SensorData.create(data).then(sensorData => {
    respone = {
      status: 'success',
      message: 'Sensor data created successfully',
      data: sensorData
    }
    console.log(`[${Date.now()}] ${req.method} ${req.originalUrl} ${JSON.stringify(respone)}`)
    
    res.status(201)
      .header('Content-Type', 'application/json')
      .header('charset', 'utf-8')
      .json(respone)
  }).catch((err) => {
    console.log("Error: " + err.message)
    next(err)
  })
}

// Update sensor data

// Delete sensor data
exports.deleteSensorData = async (req, res, next) => {
  await SensorData.destroy({
    where: {
      dataId: req.params.id
    }
  }).then((result) => {
    respone = result == 1 ? {
      status: 'success',
      message: 'Sensor data deleted successfully',
      dataId: req.params.id
    } : {
      status: 'not found',
      message: 'Sensor data not found. delete failed',
    }

    console.log(`[${Date.now()}] ${req.method} ${req.originalUrl} ${JSON.stringify(respone)}`)

    const code = result == 1 ? 200 : 404

    res.status(code)
      .header('Content-Type', 'application/json')
      .header('charset', 'utf-8')
      .json(respone)
  }).catch((err) => {
    console.log("Error: " + err.message)
    next(err)
  })
}