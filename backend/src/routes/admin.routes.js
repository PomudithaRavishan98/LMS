const router = require('express').Router();
const protect = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');
const admin = require('../controllers/admin.controller');
const {
  adminGetVideos, createVideo, updateVideo, deleteVideo, togglePublish,
} = require('../controllers/video.controller');
const {
  adminGetSessions, createSession, updateSession, deleteSession,
} = require('../controllers/liveSession.controller');

router.use(protect, requireRole('teacher'));

// Stats
router.get('/stats', admin.getStats);

// Students
router.get('/students', admin.getStudents);
router.patch('/students/:id/approve', admin.approveStudent);
router.patch('/students/:id/suspend', admin.suspendStudent);
router.delete('/students/:id', admin.deleteStudent);

// Videos
router.get('/videos', adminGetVideos);
router.post('/videos', createVideo);
router.patch('/videos/:id', updateVideo);
router.delete('/videos/:id', deleteVideo);
router.patch('/videos/:id/publish', togglePublish);

// Live Sessions
router.get('/live-sessions', adminGetSessions);
router.post('/live-sessions', createSession);
router.patch('/live-sessions/:id', updateSession);
router.delete('/live-sessions/:id', deleteSession);

// Testimonials
router.get('/testimonials', admin.getTestimonials);
router.post('/testimonials', admin.createTestimonial);
router.patch('/testimonials/:id', admin.updateTestimonial);
router.delete('/testimonials/:id', admin.deleteTestimonial);

module.exports = router;
