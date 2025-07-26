// backend/models/Vendor.js
module.exports = (sequelize, DataTypes) => {
  const Vendor = sequelize.define("Vendor", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    subscription: {
      type: DataTypes.ENUM("NORMAL", "PRIME", "VIP"),
      allowNull: false,
      defaultValue: "NORMAL",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Vendor;
};
