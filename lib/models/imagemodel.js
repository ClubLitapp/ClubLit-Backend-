const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }  // Automatically set the upload date
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
