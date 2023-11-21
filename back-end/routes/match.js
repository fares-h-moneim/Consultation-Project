import express from "express";
import getMatches from "../controller/match.js";
const matchRouter = express.Router();
matchRouter.get("/get-matches", getMatches);
export default matchRouter;