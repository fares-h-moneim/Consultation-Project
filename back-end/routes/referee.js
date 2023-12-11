import express from "express";
import { getRefereeById } from "../controller/referee.js";
import { requireManager } from "../controller/passport-setup.js";
const refereeRouter = express.Router();
refereeRouter.get("/get-referee/:refereeId", getRefereeById);
refereeRouter.post("/add-referee", requireManager, addReferee);
export default refereeRouter;