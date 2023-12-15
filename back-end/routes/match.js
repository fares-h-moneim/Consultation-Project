import express from "express";
import { getMatches, addMatch, bookMatch, getMatchById, updateMatch, getOnlyMatchById, getNextMatch } from "../controller/match.js";
import { requireFan, requireManager } from "../controller/passport-setup.js";

const matchRouter = express.Router();

matchRouter.get("/get-matches", getMatches);
matchRouter.get("/get-match/:matchId", getMatchById);  // Make sure this line is after the import
matchRouter.get("/get-only-match/:matchId", getOnlyMatchById);
matchRouter.post("/add-match", addMatch);
matchRouter.post("/book-match/:matchId/:userId", requireFan, bookMatch);
matchRouter.put("/update-match/:matchId", requireManager, updateMatch);
matchRouter.get("/get-next-match", getNextMatch);
export default matchRouter;
