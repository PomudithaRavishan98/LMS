const User = require('../models/User.model');
const Video = require('../models/Video.model');
const LiveSession = require('../models/LiveSession.model');
const Testimonial = require('../models/Testimonial.model');

exports.getStats = async (req, res, next) => {
  try {
    const [totalStudents, pendingStudents, totalVideos, upcomingSessions] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'student', isApproved: false }),
      Video.countDocuments({ isPublished: true }),
      LiveSession.countDocuments({ isActive: true, scheduledAt: { $gte: new Date() } }),
    ]);
    res.json({ totalStudents, pendingStudents, totalVideos, upcomingSessions });
  } catch (err) {
    next(err);
  }
};

exports.getStudents = async (req, res, next) => {
  try {
    const students = await User.find({ role: 'student' }).select('-passwordHash').sort('-createdAt');
    res.json(students);
  } catch (err) {
    next(err);
  }
};

exports.approveStudent = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'Student not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.suspendStudent = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isApproved: false }, { new: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'Student not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student removed' });
  } catch (err) {
    next(err);
  }
};

exports.getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort('-createdAt');
    res.json(testimonials);
  } catch (err) {
    next(err);
  }
};

exports.createTestimonial = async (req, res, next) => {
  try {
    const t = await Testimonial.create(req.body);
    res.status(201).json(t);
  } catch (err) {
    next(err);
  }
};

exports.updateTestimonial = async (req, res, next) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!t) return res.status(404).json({ message: 'Not found' });
    res.json(t);
  } catch (err) {
    next(err);
  }
};

exports.deleteTestimonial = async (req, res, next) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
