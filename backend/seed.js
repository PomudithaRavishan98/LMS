require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User.model');
const Testimonial = require('./src/models/Testimonial.model');
const connectDB = require('./src/config/db');

async function seed() {
  await connectDB();

  // Create teacher account
  const existing = await User.findOne({ email: process.env.TEACHER_EMAIL });
  if (!existing) {
    const passwordHash = await bcrypt.hash('Admin@1234', 12);
    await User.create({
      name: process.env.TEACHER_NAME || 'Teacher Admin',
      email: process.env.TEACHER_EMAIL || 'teacher@example.com',
      passwordHash,
      role: 'teacher',
      isApproved: true,
    });
    console.log('Teacher account created:', process.env.TEACHER_EMAIL);
    console.log('Default password: Admin@1234  (CHANGE THIS IMMEDIATELY!)');
  } else {
    console.log('Teacher account already exists');
  }

  // Seed sample testimonials
  const count = await Testimonial.countDocuments();
  if (count === 0) {
    await Testimonial.insertMany([
      { studentName: 'Priya Sharma', text: 'The teaching style is amazing! I improved my grades significantly in just 2 months.', rating: 5, subject: 'Mathematics', isFeatured: true },
      { studentName: 'Rahul Mehta', text: 'Best online classes I have ever attended. Concepts are explained so clearly.', rating: 5, subject: 'Physics', isFeatured: true },
      { studentName: 'Anjali Patel', text: 'The video recordings are incredibly helpful for revision. Highly recommended!', rating: 5, subject: 'Chemistry', isFeatured: true },
      { studentName: 'Vikram Singh', text: 'Live sessions are interactive and the teacher patiently answers every question.', rating: 4, subject: 'Biology', isFeatured: true },
    ]);
    console.log('Sample testimonials created');
  }

  await mongoose.disconnect();
  console.log('Seed complete!');
}

seed().catch(console.error);
