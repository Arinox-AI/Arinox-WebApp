const router = require('express').Router();
const { submitLead } = require('../controllers/leadController');

router.post('/', submitLead);

module.exports = router;
