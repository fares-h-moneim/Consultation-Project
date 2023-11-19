import express from "express";
import mongoose from "mongoose";
import UserModel from "./models/user.js";
const app = express();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2", {
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
        name: "John",
        age: 30,
    });
    await user.save();
    res.send(user);
});

app.listen(3000, () => {
    console.log("On Port 3000");
})