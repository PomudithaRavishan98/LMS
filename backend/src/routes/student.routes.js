const router = require('express').Router();
const protect = require('../middleware/auth.middleware');
const { getVideos, getVideo } = require('../controllers/video.controller');
const { getSessions, getSession } = require('../controllers/liveSession.controller');

router.use(protect);

router.get('/videos', getVideos);
router.get('/videos/:id', getVideo);
router.get('/live-sessions', getSessions);
router.get('/live-sessions/:id', getSession);

module.exports = router;
