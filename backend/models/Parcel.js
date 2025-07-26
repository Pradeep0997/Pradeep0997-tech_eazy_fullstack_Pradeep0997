// models/Parcel.js
module.exports = (sequelize, DataTypes) => {
  const Parcel = sequelize.define('Parcel', {
    trackingId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
     primaryKey: true  ,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'in transit',
    },
  });

  return Parcel;
};
