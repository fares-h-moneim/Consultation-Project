import MatchModel from "../model/match.js";
import VenueModel from "../model/venue.js";
import TeamModel from "../model/team.js";
import RefereeModel from "../model/referee.js";
import BookingModel from "../model/booking.js";
import BookingTempModel from "../model/booking-temp.js";
import jwt from "jsonwebtoken";

const getMatches = async (req, res) => {
    try {
        const matches = await MatchModel.find({date_time: {$gte: new Date()}}).sort({ date_time: 1});
        res.status(200).json(matches);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addMatch = async (req, res) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
        if (decoded.role !== 'Manager') {
            return res.status(401).json({ message: 'Unauthorized: Manager role needed' });
        }
        const existingMatch = await MatchModel.findOne({
            $or: [
                { $and: [{ home_team: req.body.home_team }, { date_time: { $gte: new Date(req.body.date_time).setHours(0, 0, 0, 0), $lt: new Date(req.body.date_time).setHours(24, 0, 0, 0) } }] },
                { $and: [{ away_team: req.body.away_team }, { date_time: { $gte: new Date(req.body.date_time).setHours(0, 0, 0, 0), $lt: new Date(req.body.date_time).setHours(24, 0, 0, 0) } }] }
            ]
        });

        if (existingMatch) {
            return res.status(400).json({ message: 'A match already exists for either home_team or away_team on this date_time' });
        }
        const newMatchData = req.body;
        const match = new MatchModel(newMatchData);
        const savedMatch = await match.save();
        res.status(201).json(savedMatch);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const bookMatch = async (req, res) => {
    try {
        const matchId = req.params.matchId;
        const userId = req.params.userId;
        const match = await MatchModel.findById(matchId);
        if (!matchId) {
            res.status(400).json({ error: 'Match ID is required' });
        }
        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
        }
        const venue = await VenueModel.findById(match.venue);

        if (!venue) {
            return res.status(404).json({ error: 'Venue not found' });
        }
        if (match.capacity === venue.capacity) {
            return res.status(400).json({ error: 'Match capacity is full' });
        }
        if (match) {
            const isMatchBooked = match.booked_fans.includes(userId);
            if (isMatchBooked) {
                res.status(400).json({ error: 'Match is already booked' });
            } else {
                match.booked_fans.push(userId);
                const savedMatch = await match.save();
                res.status(200).json(savedMatch);
            }
        } else {
            res.status(404).json({ error: 'Match not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getMatchById = async (req, res) => {
    try {
        const matchId = req.params.matchId;
        const match = await MatchModel.findById(matchId);
        const homeTeam = await TeamModel.findById(match.home_team);
        const awayTeam = await TeamModel.findById(match.away_team);
        const referee = await RefereeModel.findById(match.main_referee);
        const venue = await VenueModel.findById(match.venue);
        const lineman1 = await RefereeModel.findById(match.lineman1);
        const lineman2 = await RefereeModel.findById(match.lineman2);
        var response = {
            match: match,
            home_team: homeTeam,
            away_team: awayTeam,
            main_referee: referee,
            venue: venue,
            lineman1: lineman1,
            lineman2: lineman2
        }
        if (match) {
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Match not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getOnlyMatchById = async (req, res) => {
    try {
        const matchId = req.params.matchId;
        const match = await MatchModel.findById(matchId);
        if (match) {
            res.status(200).json(match);
        } else {
            res.status(404).json({ error: 'Match not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateMatch = async (req, res) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
        if (decoded.role !== 'Manager') {
            return res.status(401).json({ message: 'Unauthorized: Manager role needed' });
        }
        const matchId = req.body.matchId;
        const updatedMatchData = req.body;
        const reservedUsers = await BookingModel.find({ match_id: matchId });
        const reservedUsersTemp = await BookingTempModel.find({ match_id: matchId });
        if(reservedUsers.length > 0 || reservedUsersTemp.length > 0){
            return res.status(400).json({ error: "Match already has bookings, can't update." });
        }
        
        const match = await MatchModel.findByIdAndUpdate(matchId, updatedMatchData, { new: true });
        if (match) {
            res.status(200).json(match);
        }
        else {
            res.status(404).json({ error: 'Match not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getNextMatch = async (req, res) => {
    try {
        const matches = await MatchModel.find({
            date_time: { $gte: new Date() }
        }).sort({ date_time: 1 }).limit(1);

        if (matches.length === 0) {
            return res.status(404).json({ error: 'No upcoming matches found' });
        }

        const closestMatch = matches[0];
        const homeTeam = await TeamModel.findById(closestMatch.home_team);
        const awayTeam = await TeamModel.findById(closestMatch.away_team);
        const referee = await RefereeModel.findById(closestMatch.main_referee);
        const venue = await VenueModel.findById(closestMatch.venue);
        const lineman1 = await RefereeModel.findById(closestMatch.lineman1);
        const lineman2 = await RefereeModel.findById(closestMatch.lineman2);

        var response = {
            match: closestMatch,
            home_team: homeTeam,
            away_team: awayTeam,
            main_referee: referee,
            venue: venue,
            lineman1: lineman1,
            lineman2: lineman2
        };
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteMatch = async (req, res) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }

        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);

        if (decoded.role !== 'Manager') {
            return res.status(401).json({ message: 'Unauthorized: Manager role needed' });
        }

        const matchId = req.body.match_id;
        const deletedMatch = await MatchModel.findByIdAndDelete({ _id: matchId });
        const deleteBookings = await BookingModel.deleteMany({ match_id: matchId });
        const deleteBookingsTemp = await BookingTempModel.deleteMany({ match_id: matchId });
        res.status(200).json(deletedMatch);
    } catch (error) {
        console.error('Error deleting match:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export { getMatches, addMatch, bookMatch, getMatchById, updateMatch, getOnlyMatchById, getNextMatch, deleteMatch };