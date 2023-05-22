const sensorNodeModel = (sequelize, Sequelize) => {
  const SensorNode = sequelize.define('sensornode', {
    nodeId: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    nodeName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    latitude: {
      type: Sequelize.DECIMAL(18, 15),
      allowNull: true,
      validate: {
        min: -90,
        max: 90,
      },
    },
    longitude: {
      type: Sequelize.DECIMAL(18, 15),
      allowNull: true,
      validate: {
        min: -180,
        max: 180,
      },
    },
    status: {
      type: Sequelize.ENUM,
      values: ['active', 'inactive'],
      allowNull: false,
      defaultValue: 'active',
    },
    description: {
      type: Sequelize.STRING,
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

  return SensorNode
}

module.exports = sensorNodeModel