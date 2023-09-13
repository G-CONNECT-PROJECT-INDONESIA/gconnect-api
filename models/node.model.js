module.exports = (sequelize, DataTypes) => {
  const Node = sequelize.define('Node', {
    nodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    temperature: DataTypes.DOUBLE,
    humidity: DataTypes.DOUBLE,
    windspeed: DataTypes.DOUBLE,
    rainfall: DataTypes.DOUBLE,
    latitude: {
      type: DataTypes.DECIMAL(18, 15),
      validate: {
        min: -90,
        max: 90,
      },
    },
    longitude: {
      type: DataTypes.DECIMAL(18, 15),
      validate: {
        min: -180,
        max: 180,
      },
    },
    imuRoll: DataTypes.DOUBLE,
    imuPitch: DataTypes.DOUBLE,
    batteryStatus: DataTypes.INTEGER,
    dangerStatus: DataTypes.INTEGER,
  });

  return Node;
};
