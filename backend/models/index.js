// models/index.js
const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models
db.User = require("./User")(sequelize, DataTypes);
db.Parcel = require("./Parcel")(sequelize, DataTypes);
db.Vendor = require("./Vendor")(sequelize, DataTypes);
db.DeliveryOrder = require("./Delivery")(sequelize, DataTypes);

// Associations
db.Vendor.hasMany(db.DeliveryOrder, { foreignKey: "vendorId" });
db.DeliveryOrder.belongsTo(db.Vendor, { foreignKey: "vendorId" });

module.exports = db;
