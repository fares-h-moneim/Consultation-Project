import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./model/user.js";
import RequestModel from "./model/request.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";
import matchRouter from "./routes/match.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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


app.listen(3000, () => {
    console.log("On Port 3000");
})