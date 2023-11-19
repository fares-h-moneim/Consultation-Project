import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
    name: String,
    age: Number
})

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;