const router = require('express').Router();
const { getCareers, getCareerById } = require('../controllers/careerController');
const { upload, submitApplication } = require('../controllers/applicationController');
const { requireHuman } = require('../utils/humans');

router.get('/', getCareers);
// requireHuman sits after multer so the multipart fields (honeypot + token)
// are already parsed into req.body when it runs.
router.post('/apply', upload.single('resume'), requireHuman(), submitApplication);
router.get('/:id', getCareerById);

module.exports = router;
