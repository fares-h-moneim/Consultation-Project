import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  match_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reserved_seats: {
    row: { type: Number, required: true },
    col: { type: Number, required: true }
  }
});

const BookingModel = mongoose.model("Booking", bookingSchema);

export default BookingModel;

