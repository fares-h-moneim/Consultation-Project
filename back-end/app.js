import express from "express";
import mongoose from "mongoose";
import UserModel from "./model/user.js";
const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/epl", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error(err);
    }
};

connectDB();



app.get("/getUsers", async (req, res) => {
    const users = await UserModel.find({});
    res.send(users);
});

app.post("/addUser", async (req, res) => {
    const user = new UserModel({
        username: "test",
        password: "test",
        first_name: "test",
        last_name: "test",
        birth_date: "12-2-1999",
        gender: "Male",
        city: "test",
        address: "test",
        email: "test",
        role: "Manager"
    });
    await user.save();
    res.send(user);
});

app.listen(3000, () => {
    console.log("On Port 3000");
})