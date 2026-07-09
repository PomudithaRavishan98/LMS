const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    avatarUrl: { type: String, default: '' },
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    subject: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', TestimonialSchema);
