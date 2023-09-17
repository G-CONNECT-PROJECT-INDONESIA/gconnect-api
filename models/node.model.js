module.exports = (sequelize, DataTypes) => {
  const Node = sequelize.define('Node', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    gatewayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    humidity: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    soilMoisture: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    windspeed: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    rainfall: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    waterLevel: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(18, 15),
      validate: {
        min: -90,
        max: 90,
      },
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(18, 15),
      validate: {
        min: -180,
        max: 180,
      },
      allowNull: true,
    },
    imuRoll: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    imuPitch: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    batteryStatus: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    dangerStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Node;
};
