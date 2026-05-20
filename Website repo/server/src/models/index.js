const sequelize = require('../config/db');

// Import all models so Sequelize registers them
require('./User');
require('./QRSession');
require('./BlogPost');
require('./CaseStudy');
require('./Career');
require('./Contact');
require('./Partner');
require('./JobApplication');

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected');
    // force: true drops and recreates all tables (destructive, dev only)
    // alter: true adds missing columns but accumulates indexes across restarts — avoid
    // default: only creates tables that don't exist yet
    const force = process.env.DB_FORCE_SYNC === 'true';
    await sequelize.sync({ force });
    console.log('Tables synced');
  } catch (err) {
    console.error('MySQL connection error:', err.message);
    console.warn('Server running without DB — DB calls will fail.');
  }
};

module.exports = { sequelize, connectDB };
