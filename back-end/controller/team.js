import TeamModel from "../models/team.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const getAllTeams = async (req, res) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
        if (decoded.role != 'Manager') {
            return res.status(401).json({ message: 'Unauthorized: Manager role required' });
        }
        const teams = await TeamModel.find();
        res.status(201).json(teams);
    }
    catch (error) {
        console.error('Error getting all teams:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default { getAllTeams };