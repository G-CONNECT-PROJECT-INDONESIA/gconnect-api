module.exports = (sequelize, DataTypes) => {
  const Gateway = sequelize.define('Gateway', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    gatewayName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    nodeList: { // array of node
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
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
