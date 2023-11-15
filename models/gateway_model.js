// module.exports = (sequelize, DataTypes) => {
//   const Gateway = sequelize.define("gateway", {
//     gateway_id: DataTypes.INTEGER,
//     gateway_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       primaryKey: true,
//       unique: true,
//     },
//   });
// };

module.exports = (sequelize, DataTypes) => {
    const Gateway = sequelize.define("gateway", {
        gateway_id: DataTypes.INTEGER,
        gateway_name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
    });

    return Gateway;
};
