import mongoose from "mongoose";
const RefereeSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true }
})
const RefereeModel = mongoose.model("Referee", RefereeSchema);
export default RefereeModel;