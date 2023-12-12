import mongoose from "mongoose";
const venueSchema = new mongoose.Schema({
  venue_name: { type: String, required: true, unique: true },
  num_of_rows: { type: Number, required: true },
  num_of_seats_per_row: { type: Number, required: true }
});
const VenueModel = mongoose.model("Venue", venueSchema);
export default VenueModel;