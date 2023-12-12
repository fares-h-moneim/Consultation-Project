import express from "express";
import getAllTeams from "../controller/team.js";

const teamRouter = express.Router();
teamRouter.get("/get-all-teams", getAllTeams);
export default teamRouter;