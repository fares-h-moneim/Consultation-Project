import mongoose from "mongoose";

const bookingTempSchema = new mongoose.Schema({
  match_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reserved_seats: {
    row: { type: Number, required: true },
    col: { type: Number, required: true }
  },
  expires_at: { type: Date, default: Date.now, index: { expires: '5m' } }
});

const BookingTempModel = mongoose.model("BookingTemp", bookingTempSchema);

export default BookingTempModel;