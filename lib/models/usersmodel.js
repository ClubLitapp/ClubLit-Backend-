import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: {type: String, required:true, unique: false},
  email: { type: String, required: true },
  location: {
    type: String,
    required: true
  }
  //photos = list of uris to the photos in google cloud
});

// userSchema.index({ location: '2dsphere' }); // Index for geospatial queries



export const User = mongoose.model('User', userSchema)

