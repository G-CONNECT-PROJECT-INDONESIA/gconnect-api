module.exports = (sequelize, DataTypes) => {
  const Gateway = sequelize.define('Gateway', {
    gatewayName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    nodeList: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    location: DataTypes.STRING,
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
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
    description: DataTypes.STRING,
  });

  return Gateway;
};
