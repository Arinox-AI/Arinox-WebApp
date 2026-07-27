const router = require('express').Router();
const { getCaseStudies, getCaseStudyBySlug } = require('../controllers/caseStudyController');

router.get('/', getCaseStudies);
router.get('/:slug', getCaseStudyBySlug);

module.exports = router;
