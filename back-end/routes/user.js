import express from "express";
import {signIn, logout} from "../controller/user.js";
const userRouter = express.Router();
userRouter.post("/sign-in", signIn);
userRouter.post("/log-out", logout);
//userRouter.post("/refresh", handleRefresh);
// userRouter.post("/verify/:token", handleVerify);
export default userRouter;
