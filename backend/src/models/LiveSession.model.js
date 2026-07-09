const mongoose = require('mongoose');

const LiveSessionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    platform: { type: String, enum: ['zoom', 'meet', 'teams', 'other'], default: 'zoom' },
    joinUrl: { type: String, required: true },
    subject: { type: String, required: true },
    scheduledAt: { type: Date, required: true },
    durationMins: { type: Number, default: 60 },
    isActive: { type: Boolean, default: true },
    meetingId: { type: String, default: '' },
    passcode: { type: String, default: '' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LiveSession', LiveSessionSchema);
