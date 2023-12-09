import express from "express";
import {addRequest, approveRequest, declineRequest} from "../controller/request.js";
import {requireAdmin} from "../controller/passport-setup.js";
const requestRouter = express.Router();
requestRouter.post("/add-request", addRequest);
requestRouter.post("/approve-request/:id", requireAdmin, approveRequest);
requestRouter.delete("/decline-request/:id", requireAdmin, declineRequest);
export default requestRouter;