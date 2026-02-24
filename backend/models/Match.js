const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Match = sequelize.define('Match', {
  id: {
     type: DataTypes.INTEGER, 
     primaryKey: true, 
     autoIncrement: true 
    },
  title: {
     type: DataTypes.STRING,
      allowNull: false
     },
  description: {
     type: DataTypes.TEXT 
    },
  date: {
     type: DataTypes.DATE, 
     allowNull: false 
    },
  maxPlayers: { 
    type: DataTypes.INTEGER, 
    allowNull: false
 },
  currentPlayers: {
     type: DataTypes.INTEGER, 
     defaultValue: 1
     },
  pricePerPerson: { 
    type: DataTypes.DECIMAL(10, 2)
 },
  status: { 
    type: DataTypes.ENUM('Aktivno', 'Popunjeno', 'Otkazano', 'Završeno'),
    defaultValue: 'Aktivno'
  },
 
  creatorId: {
     type: DataTypes.INTEGER, 
     allowNull: false
     },
  sportId: {
     type: DataTypes.INTEGER,
      allowNull: false
     },
     address: {
    type: DataTypes.STRING, 
    allowNull: false 
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false
  }
  
});

module.exports = Match;