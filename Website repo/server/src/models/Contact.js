const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contact = sequelize.define('Contact', {
  id:      { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:    { type: DataTypes.STRING(100), allowNull: false },
  email:   { type: DataTypes.STRING, allowNull: false },
  company: { type: DataTypes.STRING },
  phone:   { type: DataTypes.STRING },
  subject: { type: DataTypes.ENUM('General Inquiry', 'Partnership', 'Demo Request', 'Career', 'Media', 'Other'), defaultValue: 'General Inquiry' },
  message: { type: DataTypes.TEXT, allowNull: false },
  status:  { type: DataTypes.ENUM('new', 'read', 'replied'), defaultValue: 'new' },
}, { timestamps: true });

module.exports = Contact;
