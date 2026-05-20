const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const JobApplication = sequelize.define('JobApplication', {
  id:         { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fullName:   { type: DataTypes.STRING(100), allowNull: false },
  email:      { type: DataTypes.STRING, allowNull: false },
  phone:      { type: DataTypes.STRING(30), allowNull: false },
  role:       { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING },
  resumeName: { type: DataTypes.STRING },
  resumePath: { type: DataTypes.STRING },
  linkedIn:   { type: DataTypes.STRING(500) },
  coverNote:  { type: DataTypes.TEXT },
  status:     { type: DataTypes.ENUM('new', 'reviewed', 'shortlisted', 'rejected'), defaultValue: 'new' },
}, { timestamps: true });

module.exports = JobApplication;
