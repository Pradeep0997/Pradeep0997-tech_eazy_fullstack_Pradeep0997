module.exports = (sequelize, DataTypes) => {
  return sequelize.define("DeliveryOrder", {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalOrders: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fileLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
