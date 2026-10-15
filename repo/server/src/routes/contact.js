const router = require('express').Router();
const { submitContact } = require('../controllers/contactController');
const { requireHuman } = require('../utils/humans');

router.post('/', requireHuman(), submitContact);

module.exports = router;
