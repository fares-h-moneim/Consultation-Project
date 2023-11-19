import mongoose from "mongoose";
const TeamSchema = mongoose.Schema({
  team_name: { type: String, required: true, unique: true },
  logo: { type: String, required: true }
})
const TeamModel = mongoose.model("Team", TeamSchema);
export default TeamModel;