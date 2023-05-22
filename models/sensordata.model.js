const sensorDataModel = (sequelize, Sequelize) => {
  const SensorData = sequelize.define('sensordata', {
    dataId: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    nodeId: {
      type: Sequelize.STRING,
      foreignKey: true,
      allowNull: false,
    },
    temperature: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    humidity: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    windspeed: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    rainfall: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    latitude: {
      type: Sequelize.DECIMAL(18,15),
      allowNull: true,
      validate: {
        min: -90,
        max: 90,
      },
    },
    longitude: {
      type: Sequelize.DECIMAL(18,15),
      allowNull: true,
      validate: {
        min: -180,
        max: 180,
      },
    },
    imuRoll: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    imuPitch: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    batteryStatus: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    dangerStatus: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  })

  return SensorData
}

module.exports = sensorDataModel