const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Career = sequelize.define('Career', {
  id:               { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title:            { type: DataTypes.STRING, allowNull: false },
  department:       { type: DataTypes.ENUM('Engineering', 'AI Research', 'Sales', 'Marketing', 'Operations', 'Delivery', 'Finance', 'HR'), allowNull: false },
  location:         { type: DataTypes.STRING, allowNull: false },
  type:             { type: DataTypes.ENUM('Full-time', 'Part-time', 'Contract', 'Internship'), defaultValue: 'Full-time' },
  description:      { type: DataTypes.TEXT, allowNull: false },
  responsibilities: { type: DataTypes.JSON, defaultValue: [] },
  requirements:     { type: DataTypes.JSON, defaultValue: [] },
  niceToHave:       { type: DataTypes.JSON, defaultValue: [] },
  active:           { type: DataTypes.BOOLEAN, defaultValue: true },
}, { timestamps: true });

module.exports = Career;
