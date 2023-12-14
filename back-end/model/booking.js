import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reservedSeats: { type: [String], required: true }
});

const BookingModel = mongoose.model("Booking", bookingSchema);

export default BookingModel;
