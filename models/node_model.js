module.exports = (sequelize, DataTypes) => {
    const Node = sequelize.define("node", {
        gateway_id: DataTypes.INTEGER,
        node_id: DataTypes.INTEGER,
        temperature: DataTypes.DOUBLE,
        humidity: DataTypes.DOUBLE,
        windspeed: DataTypes.DOUBLE,
        soil_moisture: DataTypes.DOUBLE,
        rainfall: DataTypes.DOUBLE,
        water_level: DataTypes.DOUBLE,
        pitch: DataTypes.DOUBLE,
        roll: DataTypes.DOUBLE,
        latitude: DataTypes.DOUBLE,
        longitude: DataTypes.DOUBLE,
        // latitude: {
        //   type: DataTypes.DECIMAL(7, 7),
        //   validate: {
        //     min: -90,
        //     max: 90,
        //   },
        // },
        // longitude: {
        //   type: DataTypes.DECIMAL(7, 7),
        //   validate: {
        //     min: -180,
        //     max: 180,
        //   },
        // },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    return Node;
};
