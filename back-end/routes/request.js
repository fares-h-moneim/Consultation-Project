import express from "express";
import {addRequest, approveRequest, declineRequest} from "../controller/request.js";
const requestRouter = express.Router();
requestRouter.post("/add-request", addRequest);
requestRouter.post("/approve-request/:id", approveRequest);
requestRouter.delete("/decline-request/:id", declineRequest);
export default requestRouter;