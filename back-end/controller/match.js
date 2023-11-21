import MatchModel from "../model/match.js";

const getMatches = async (req, res) => {
    try{
        const matches = await MatchModel.find({});
        res.status(200).json(matches);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export default getMatches;