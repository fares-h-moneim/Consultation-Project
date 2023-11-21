import express from "express";
import {signIn, handleLogout, handleRefresh, handleVerify} from "../controller/user.js";
const userRouter = express.Router();
userRouter.post("/signin", signIn);
userRouter.post("/logout", handleLogout);
userRouter.post("/refresh", handleRefresh);
userRouter.post("/verify/:token", handleVerify);
export default userRouter;
