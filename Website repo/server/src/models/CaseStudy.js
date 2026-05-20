const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CaseStudy = sequelize.define('CaseStudy', {
  id:             { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title:          { type: DataTypes.STRING, allowNull: false },
  slug:           { type: DataTypes.STRING, allowNull: false, unique: true },
  clientName:     { type: DataTypes.STRING, allowNull: false },
  clientLogo:     { type: DataTypes.STRING },
  clientIndustry: { type: DataTypes.STRING, allowNull: false },
  challenge:      { type: DataTypes.TEXT, allowNull: false },
  solution:       { type: DataTypes.TEXT, allowNull: false },
  results:        { type: DataTypes.JSON, defaultValue: [] },
  technologies:   { type: DataTypes.JSON, defaultValue: [] },
  content:        { type: DataTypes.TEXT('long') },
  coverImage:     { type: DataTypes.STRING },
  published:      { type: DataTypes.BOOLEAN, defaultValue: false },
  featured:       { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

module.exports = CaseStudy;
