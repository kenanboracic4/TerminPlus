const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Sport = sequelize.define('Sport', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true,
     autoIncrement: true 
    },
  name: { 
    type: DataTypes.STRING,
     allowNull: false 
    }, 
  iconUrl: { 
    type: DataTypes.STRING
 } 
}, { 
    timestamps: false 
});

module.exports = Sport;