const LiveSession = require('../models/LiveSession.model');

// Student: get active upcoming sessions
exports.getSessions = async (req, res, next) => {
  try {
    const sessions = await LiveSession.find({ isActive: true }).sort('scheduledAt');
    res.json(sessions);
  } catch (err) {
    next(err);
  }
};

// Student: single session
exports.getSession = async (req, res, next) => {
  try {
    const session = await LiveSession.findById(req.params.id);
    if (!session || !session.isActive) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    next(err);
  }
};

// Admin: all sessions
exports.adminGetSessions = async (req, res, next) => {
  try {
    const sessions = await LiveSession.find().sort('-scheduledAt');
    res.json(sessions);
  } catch (err) {
    next(err);
  }
};

// Admin: create session
exports.createSession = async (req, res, next) => {
  try {
    const session = await LiveSession.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
};

// Admin: update session
exports.updateSession = async (req, res, next) => {
  try {
    const session = await LiveSession.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    next(err);
  }
};

// Admin: delete session
exports.deleteSession = async (req, res, next) => {
  try {
    await LiveSession.findByIdAndDelete(req.params.id);
    res.json({ message: 'Session deleted' });
  } catch (err) {
    next(err);
  }
};
