const {Sequelize, DataTypes} = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../db/parcel.db'),
    logging: false,
});

const Parcel = sequelize.define('Parcel',{
    trackingId:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    sender:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    receiver:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue: 'in transit',
    },
});

module.exports = {sequelize , Parcel};