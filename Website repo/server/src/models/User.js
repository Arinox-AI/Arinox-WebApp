const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name:        { type: DataTypes.STRING, allowNull: false },
  email:       { type: DataTypes.STRING, allowNull: false, unique: true },
  password:    { type: DataTypes.STRING },
  avatar:      { type: DataTypes.STRING },
  role:        { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
  company:     { type: DataTypes.STRING },
  phone:       { type: DataTypes.STRING },
  isVerified:  { type: DataTypes.BOOLEAN, defaultValue: false },
  lastLogin:   { type: DataTypes.DATE },
  googleId:    { type: DataTypes.STRING, unique: true },
  loginMethod: { type: DataTypes.ENUM('password', 'qr', 'google'), defaultValue: 'password' },
}, { timestamps: true });

User.beforeSave(async (user) => {
  if (user.changed('password') && user.password) {
    user.password = await bcrypt.hash(user.password, 12);
  }
});

User.prototype.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = User;
