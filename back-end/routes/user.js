import express from "express";
import {signIn, logout, getDetailsByUsername, updateDetails} from "../controller/user.js";
const userRouter = express.Router();
userRouter.post("/sign-in", signIn);
userRouter.post("/log-out", logout);
userRouter.get("/details", getDetailsByUsername);
userRouter.put("/update-details", updateDetails);
//userRouter.post("/refresh", handleRefresh);
// userRouter.post("/verify/:token", handleVerify);
export default userRouter;
