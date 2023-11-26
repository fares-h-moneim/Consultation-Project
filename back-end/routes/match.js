import express from "express";
import { getMatches, addMatch } from "../controller/match.js";
const matchRouter = express.Router();
matchRouter.get("/get-matches", getMatches);
matchRouter.post("/add-match", addMatch);
export default matchRouter;