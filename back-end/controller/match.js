import MatchModel from "../model/match.js";

const getMatches = async (req, res) => {
    try {
        const matches = await MatchModel.find({});
        res.status(200).json(matches);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addMatch = async (req, res) => {
    try {
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

export { getMatches, addMatch };