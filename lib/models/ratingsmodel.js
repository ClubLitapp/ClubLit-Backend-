const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 } // Rating scale from 1 to 5
}, { timestamps: true }); // Enable timestamps to track when the rating was created or updated

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
