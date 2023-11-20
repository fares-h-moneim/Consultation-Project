import RequestModel from "../model/request.js";

const addRequest = async (req, res) => {
    try {
        const newRequestData = req.body;
        const request = new RequestModel(newRequestData);
        const savedRequest = await request.save();
        res.status(201).json(savedRequest); // Return the saved request with a 201 status code for successful creation
    } catch (error) {
        console.error('Error adding request:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation failed', details: error.errors });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default addRequest;