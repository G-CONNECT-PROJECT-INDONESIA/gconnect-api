const mongoose = require('mongoose')
const SensorNode = require('./sensornode.model')

const SensorDataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  nodeID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: SensorNode,
  },
  temperature: {
    type: Number,
  },
  humidity: {
    type: Number,
  },
  windSpeed: {
    type: Number,
  },
  rainfall: {
    type: Number,
    default: 0,
  },
  tiltX: {
    type: Number,
  },
  tiltY: {
    type: Number,
  },
  motionAx: {
    type: Number,
  },
  motionAy: {
    type: Number,
  },
  motionAz: {
    type: Number,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const SensorData = mongoose.model('SensorData', SensorDataSchema)

module.exports = SensorData