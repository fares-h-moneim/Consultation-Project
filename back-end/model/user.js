import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  birth_date: { type: Date },
  gender: { type: String, enum: ['Male', 'Female'] },
  city: { type: String },
  address: { type: String },
  email: { type: String, required: true },
  role: { type: String, enum: ['Manager', 'Fan'] },
  refresh_token: { type: String },
})

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;