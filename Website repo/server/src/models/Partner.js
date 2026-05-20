const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Partner = sequelize.define('Partner', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:        { type: DataTypes.STRING, allowNull: false },
  logo:        { type: DataTypes.STRING },
  website:     { type: DataTypes.STRING },
  category:    { type: DataTypes.ENUM('Technology Partner', 'System Integrator', 'Enterprise Client', 'Cloud Partner'), allowNull: false },
  description: { type: DataTypes.TEXT },
  industry:    { type: DataTypes.STRING },
  featured:    { type: DataTypes.BOOLEAN, defaultValue: false },
  active:      { type: DataTypes.BOOLEAN, defaultValue: true },
  order:       { type: DataTypes.INTEGER, defaultValue: 0 },
}, { timestamps: true });

module.exports = Partner;
