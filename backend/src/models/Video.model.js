const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    embedUrl: { type: String, required: true },
    provider: { type: String, enum: ['youtube', 'vimeo', 'other'], default: 'youtube' },
    subject: { type: String, required: true },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
    thumbnailUrl: { type: String, default: '' },
    duration: { type: String, default: '' },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', VideoSchema);
