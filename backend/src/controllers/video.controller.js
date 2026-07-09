const Video = require('../models/Video.model');

// Student: get published videos
exports.getVideos = async (req, res, next) => {
  try {
    const filter = { isPublished: true };
    if (req.query.subject) filter.subject = req.query.subject;
    const videos = await Video.find(filter).sort('-createdAt');
    res.json(videos);
  } catch (err) {
    next(err);
  }
};

// Student: get single video
exports.getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video || !video.isPublished) return res.status(404).json({ message: 'Video not found' });
    video.viewCount += 1;
    await video.save();
    res.json(video);
  } catch (err) {
    next(err);
  }
};

// Admin: get all videos
exports.adminGetVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort('-createdAt');
    res.json(videos);
  } catch (err) {
    next(err);
  }
};

// Admin: create video
exports.createVideo = async (req, res, next) => {
  try {
    const video = await Video.create({ ...req.body, uploadedBy: req.user._id });
    res.status(201).json(video);
  } catch (err) {
    next(err);
  }
};

// Admin: update video
exports.updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (err) {
    next(err);
  }
};

// Admin: delete video
exports.deleteVideo = async (req, res, next) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video deleted' });
  } catch (err) {
    next(err);
  }
};

// Admin: toggle publish
exports.togglePublish = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    video.isPublished = !video.isPublished;
    await video.save();
    res.json(video);
  } catch (err) {
    next(err);
  }
};
