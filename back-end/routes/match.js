import express from "express";
import { getMatches, addMatch, bookMatch } from "../controller/match.js";
import { requireFan, requireManager } from "../controller/passport-setup.js";
const matchRouter = express.Router();
matchRouter.get("/get-matches", getMatches);
matchRouter.post("/add-match", requireManager, addMatch);
matchRouter.post("/book-match/:matchId/:userId", requireFan, bookMatch);
export default matchRouter;