const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Participant = sequelize.define('Participant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  matchId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Na čekanju', 'Potvrđeno', 'Odbijeno'),
    defaultValue: 'Potvrđeno'
  }
});

module.exports = Participant;