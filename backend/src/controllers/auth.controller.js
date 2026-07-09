const User = require('../models/User.model');
const { sign } = require('../utils/jwt.utils');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, passwordHash: password, phone });
    res.status(201).json({
      message: 'Registration successful! Your account is pending teacher approval.',
      userId: user._id,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    if (!user.isApproved) {
      return res.status(403).json({ message: 'Account pending approval. Please wait for the teacher to approve your access.' });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = sign({ userId: user._id, role: user.role });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    avatarUrl: req.user.avatarUrl,
    enrolledSubjects: req.user.enrolledSubjects,
  });
};
