import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./model/user.js";
import RequestModel from "./model/request.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";
import matchRouter from "./routes/match.js";
import MatchModel from "./model/match.js";
import bcrypt from "bcrypt";
import venueRouter from "./routes/venue.js";
import refereeRouter from "./routes/referee.js";
import teamRouter from "./routes/team.js";
import bookingRouter from "./routes/booking.js";
import bookingTempRouter from "./routes/booking-temp.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
app.use("/request", requestRouter);
app.use("/user", userRouter);
app.use("/match", matchRouter);
app.use("/venue", venueRouter);
app.use("/referee", refereeRouter);
app.use("/team", teamRouter);
app.use("/booking", bookingRouter)
app.use("/booking-temp", bookingTempRouter)
app.get("/getRequest", async (req, res) => {
    const users = await RequestModel.find({});
    res.send(users);
});

app.get("/getUser", async (req, res) => {
    const users = await UserModel.find({});
    res.send(users);
});

app.post("/addUser", async (req, res) => {
    const user = new UserModel({
        username: "yehia1",
        password: await bcrypt.hash("123456", 10),
        first_name: "yehia",
        last_name: "yehia",
        birth_date: "1999-12-12",
        gender: "Male",
        city: "Cairo",
        address: "Cairo",
        email: "yehiatarek63@gmail.com",
        role: "Fan"
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.use("/add-match", async (req, res) => {
    const match = new MatchModel(req.body);
    const savedMatch = await match.save();
    res.send(savedMatch);
});

app.listen(3000, () => {
    console.log("On Port 3000");
});