import mongoose from "mongoose";
const matchSchema = new mongoose.Schema({
  home_team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  away_team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  date_time: { type: Date, required: true },
  main_referee: { type: mongoose.Schema.Types.ObjectId, ref: 'Referee', required: true },
  lineman1: { type: mongoose.Schema.Types.ObjectId, ref: 'Referee', required: true },
  lineman2: { type: mongoose.Schema.Types.ObjectId, ref: 'Referee', required: true },
  capacity: { type: Number, required: true },
  booked_fans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
const MatchModel = mongoose.model("Match", matchSchema);
export default MatchModel;