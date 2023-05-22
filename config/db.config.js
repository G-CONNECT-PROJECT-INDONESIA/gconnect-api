require('dotenv').config()

const Sequlize = require('sequelize')
const sequelize = new Sequlize(
  process.env.MYSQL_DB_NAME, 
  process.env.MYSQL_USERNAME, 
  process.env.MYSQL_PASSWORD, 
  { 
    host: 'localhost',
    port: 3306,
    dialect: process.env.MYSQL_DIALECT,

    pool: {
      max: parseInt(process.env.MYSQL_POOL_MAX),
      min: parseInt(process.env.MYSQL_POOL_MIN),
      acquire: parseInt(process.env.MYSQL_POOL_ACQUIRE),
      idle: parseInt(process.env.MYSQL_POOL_IDLE),
    }
  }
)

const db = {}

db.Sequlize = Sequlize
db.sequelize = sequelize

// Models/tables
db.sensornode = require('../models/sensornode.model')(sequelize, Sequlize)
db.sensordata = require('../models/sensordata.model')(sequelize, Sequlize)

module.exports = db

