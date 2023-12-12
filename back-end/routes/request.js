import express from "express";
import { addRequest, approveRequest, declineRequest, getAllRequests } from "../controller/request.js";
import { requireAdmin } from "../controller/passport-setup.js";
const requestRouter = express.Router();
requestRouter.post("/add-request", addRequest);
requestRouter.post("/approve-request", approveRequest);
requestRouter.delete("/decline-request", declineRequest);
requestRouter.get("/get-all-requests", getAllRequests);
export default requestRouter;