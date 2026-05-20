const { Op } = require('sequelize');
const Career = require('../models/Career');

const getCareers = async (req, res, next) => {
  try {
    const { department, location, type } = req.query;
    const where = { active: true };
    if (department) where.department = department;
    if (location) where.location = { [Op.like]: `%${location}%` };
    if (type) where.type = type;

    const careers = await Career.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: careers });
  } catch (err) { next(err); }
};

const getCareerById = async (req, res, next) => {
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career || !career.active) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, data: career });
  } catch (err) { next(err); }
};

module.exports = { getCareers, getCareerById };
