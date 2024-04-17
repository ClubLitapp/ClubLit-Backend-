import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageList: [{ type: [String], required: false}], // Assuming Photo UUIDs are strings
  address: { type: String },  // Optional, for a more human-readable address
  location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
  },
  ratings: { type: Number, required: true, default: 0 } // Average rating, initially set to 0
  });

  

  

  





export const Club = mongoose.model('Club', clubSchema);
