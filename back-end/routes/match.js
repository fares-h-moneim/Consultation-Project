import express from "express";
import { getMatches, addMatch, bookMatch, getMatchById, updateMatch, getOnlyMatchById } from "../controller/match.js";
import { requireFan, requireManager } from "../controller/passport-setup.js";

const matchRouter = express.Router();

matchRouter.get("/get-matches", getMatches);
matchRouter.get("/get-match/:matchId", getMatchById);  // Make sure this line is after the import
matchRouter.get("/get-only-match/:matchId", getOnlyMatchById);
matchRouter.post("/add-match", requireManager, addMatch);
matchRouter.post("/book-match/:matchId/:userId", requireFan, bookMatch);
matchRouter.put("/update-match/:matchId", requireManager, updateMatch);
export default matchRouter;
