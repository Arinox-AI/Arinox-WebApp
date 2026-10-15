const router = require('express').Router();
const { submitLead } = require('../controllers/leadController');
const { requireHuman } = require('../utils/humans');

router.post('/', requireHuman(), submitLead);

module.exports = router;
