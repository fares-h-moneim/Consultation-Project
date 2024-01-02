import RefereeModel from "../model/referee.js";

const getRefereeById = async (req, res) => {
    try {
        const refereeId = req.params.refereeId;
        const referee = await RefereeModel.findById(refereeId);
        if (referee) {
            res.status(200).json(referee);
        } else {
            res.status(404).json({ error: 'Referee not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//not used as it wasn't written in the document to add referees
const addReferee = async (req, res) => {
    try {
        const newRefereeData = req.body;
        const referee = new RefereeModel(newRefereeData);
        const savedReferee = await referee.save();
        res.status(201).json(savedReferee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const getReferees = async (req, res) => {
    try {
        const referees = await RefereeModel.find({});
        res.status(200).json(referees);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { getRefereeById, addReferee, getReferees };