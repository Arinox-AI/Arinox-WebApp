const router = require('express').Router();
const { getPosts, getPostBySlug } = require('../controllers/blogController');

router.get('/', getPosts);
router.get('/:slug', getPostBySlug);

module.exports = router;
