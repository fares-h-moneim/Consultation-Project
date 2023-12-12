import RequestModel from "../model/request.js";
import UserModel from "../model/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const addRequest = async (req, res) => {
    try {
        const newRequestData = req.body;
        newRequestData.password = await bcrypt.hash(newRequestData.password, 10);
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

const approveRequest = async (req, res) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
        if (decoded.role != 'Admin') {
            return res.status(401).json({ message: 'Unauthorized: Admin role required' });
        }
        const request = await RequestModel.findById(req.body.id);
        if (request) {
            const newUser = new UserModel({
                username: request.username,
                password: request.password,
                first_name: request.first_name,
                last_name: request.last_name,
                birth_date: request.birth_date,
                gender: request.gender,
                city: request.city,
                address: request.address,
                email: request.email,
                role: request.role
            });
            const savedUser = await newUser.save();
            const deletedRequest = await RequestModel.findByIdAndDelete(req.body.id);
            res.status(201).json(savedUser);
        }
        else {
            res.status(404).json({ error: 'Request not found' });
        }
    }
    catch (error) {
        console.error('Error approving request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const declineRequest = async (req, res) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
        if (decoded.role != 'Admin') {
            return res.status(401).json({ message: 'Unauthorized: Admin role required' });
        }
        const request = await RequestModel.findById(req.body.id);
        if (request) {
            const deletedRequest = await RequestModel.findByIdAndDelete(req.body.id);
            res.status(201).json(deletedRequest);
        }
        else {
            res.status(404).json({ error: 'Request not found' });
        }
    }
    catch (error) {
        console.error('Error declining request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const getAllRequests = async (req, res) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
        if (decoded.role != 'Admin') {
            return res.status(401).json({ message: 'Unauthorized: Admin role required' });
        }
        const requests = await RequestModel.find();
        res.status(201).json(requests);
    }
    catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { addRequest, approveRequest, declineRequest, getAllRequests };
