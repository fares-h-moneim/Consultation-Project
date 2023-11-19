import express from "express";
import mongoose from "mongoose";
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

const UserSchema = mongoose.Schema({
    name: String,
    age: Number
})

const UserModel = mongoose.model("users", UserSchema);

app.get("/getUsers", (req, res) => {
    res.json(UserModel.find({}).then(function (users) {
        res.json(users);
    })).catch((err) => res.status(400).json({
        err
    }));
});

app.listen(3000, () => {
    console.log("On Port 3000");
})