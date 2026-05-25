const router = require('express').Router();
const { chatHandler } = require('../controllers/chatController');

router.post('/', chatHandler);

module.exports = router;
