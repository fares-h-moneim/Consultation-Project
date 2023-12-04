import express from "express";
import signIn from "../controller/user.js";
const userRouter = express.Router();
userRouter.post("/signin", signIn);
// userRouter.post("/logout", handleLogout);
// userRouter.post("/refresh", handleRefresh);
// userRouter.post("/verify/:token", handleVerify);
export default userRouter;
