import express from "express";
import { getRefereeById, addReferee, getReferees } from "../controller/referee.js";
import { requireManager } from "../controller/passport-setup.js";
const refereeRouter = express.Router();
refereeRouter.get("/get-referee/:refereeId", getRefereeById);
refereeRouter.post("/add-referee", requireManager, addReferee);
refereeRouter.get("/get-referees", getReferees);
export default refereeRouter;