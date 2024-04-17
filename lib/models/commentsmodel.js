const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  content: { type: String, required: true }
}, { timestamps: true }); // This option adds `createdAt` and `updatedAt` fields automatically

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
