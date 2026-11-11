const router = require('express').Router();
const { submitInquiry } = require('../controllers/inquiryController');
const { requireHuman } = require('../utils/humans');

router.post('/', requireHuman(), submitInquiry);

module.exports = router;
