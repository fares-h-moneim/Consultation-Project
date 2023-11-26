import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./model/user.js";
import RequestModel from "./model/request.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";
import matchRouter from "./routes/match.js";
import MatchModel from "./model/match.js";
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
app.get("/getRequest", async (req, res) => {
    const users = await RequestModel.find({});
    res.send(users);
});

app.get("/getUser", async (req, res) => {
    const users = await UserModel.find({});
    res.send(users);

});

app.use("/add-match", async (req, res) => {
    const match = new MatchModel(req.body);
    const savedMatch = await match.save();
    res.send(savedMatch);
});

app.listen(3000, () => {
    console.log("On Port 3000");
})