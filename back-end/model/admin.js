import mongoose from "mongoose";
const AdminSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})
const AdminModel = mongoose.model("Admin", AdminSchema);
export default AdminModel;

//Currently not used as admins are entries in user table