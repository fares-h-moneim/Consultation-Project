import express from "express";
import { signIn, logout, getDetailsByUsername, updateDetails, checkUserAvailability, getAllUsers, deleteUser, changePassword } from "../controller/user.js";
const userRouter = express.Router();
userRouter.post("/sign-in", signIn);
userRouter.post("/log-out", logout);
userRouter.get("/details", getDetailsByUsername);
userRouter.put("/update-details", updateDetails);
userRouter.get("/check-username-availability/:username", checkUserAvailability);
userRouter.get("/get-all-users", getAllUsers);
userRouter.delete("/delete-user", deleteUser);
userRouter.put("/change-password", changePassword);
//userRouter.post("/refresh", handleRefresh);
// userRouter.post("/verify/:token", handleVerify);
export default userRouter;
