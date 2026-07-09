const Testimonial = require('../models/Testimonial.model');
const nodemailer = require('nodemailer');

exports.getProfile = (req, res) => {
  res.json({
    name: process.env.TEACHER_NAME || 'Your Teacher Name',
    title: 'Expert Educator & Mentor',
    bio: 'Passionate educator with years of experience helping students achieve their academic goals. I believe every student has the potential to excel with the right guidance.',
    email: process.env.TEACHER_EMAIL || 'teacher@example.com',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
    experience: '10+ Years',
    students: '500+',
    rating: '4.9',
    socialLinks: {
      youtube: '',
      linkedin: '',
      instagram: '',
    },
  });
};

exports.getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isFeatured: true }).sort('-createdAt').limit(6);
    res.json(testimonials);
  } catch (err) {
    next(err);
  }
};

exports.contact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      await transporter.sendMail({
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: process.env.TEACHER_EMAIL,
        subject: `New contact from ${name}`,
        text: `From: ${name} (${email})\n\n${message}`,
      });
    }

    res.json({ message: 'Message sent successfully!' });
  } catch (err) {
    next(err);
  }
};
