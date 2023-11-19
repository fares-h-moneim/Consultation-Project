import mongoose from "mongoose";
const venueSchema = new mongoose.Schema({
  venue_name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
});
const VenueModel = mongoose.model("Venue", venueSchema);
export default VenueModel;