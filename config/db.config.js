require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    pool: {
      max: parseInt(process.env.MYSQL_POOL_MAX),
      min: parseInt(process.env.MYSQL_POOL_MIN),
      acquire: parseInt(process.env.MYSQL_POOL_ACQUIRE),
      idle: parseInt(process.env.MYSQL_POOL_IDLE),
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.node = require('../models/node.model')(sequelize, Sequelize);
db.gateway = require('../models/gateway.model')(sequelize, Sequelize);

module.exports = db;
