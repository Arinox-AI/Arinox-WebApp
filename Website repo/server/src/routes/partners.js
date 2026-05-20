const router = require('express').Router();
const { getPartners } = require('../controllers/partnerController');

router.get('/', getPartners);

module.exports = router;
