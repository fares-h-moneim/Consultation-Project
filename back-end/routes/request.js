import express from "express";
import addRequest from "../controller/request.js";
const requestRouter = express.Router();
requestRouter.post("/add-request", addRequest);
export default requestRouter;