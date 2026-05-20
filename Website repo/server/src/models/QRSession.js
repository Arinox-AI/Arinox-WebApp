const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const QRSession = sequelize.define('QRSession', {
  id:        { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  token:     { type: DataTypes.STRING(36), allowNull: false, unique: true },
  status:    { type: DataTypes.ENUM('pending', 'scanned', 'authenticated', 'expired'), defaultValue: 'pending' },
  userId:    { type: DataTypes.INTEGER },
  jwt:       { type: DataTypes.TEXT },
  expiresAt: { type: DataTypes.DATE },
}, { timestamps: true });

module.exports = QRSession;
