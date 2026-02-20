import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  service: String,
  date: String,
  timeSlot: String,
  price: Number,
  
});

export default mongoose.model("Booking", bookingSchema);
