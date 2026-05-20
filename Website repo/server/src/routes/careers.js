const router = require('express').Router();
const { getCareers, getCareerById } = require('../controllers/careerController');
const { upload, submitApplication } = require('../controllers/applicationController');

router.get('/', getCareers);
router.post('/apply', upload.single('resume'), submitApplication);
router.get('/:id', getCareerById);

module.exports = router;
