const router = require('express').Router();
const { getProfile, getTestimonials, contact } = require('../controllers/public.controller');

router.get('/profile', getProfile);
router.get('/testimonials', getTestimonials);
router.post('/contact', contact);

module.exports = router;
