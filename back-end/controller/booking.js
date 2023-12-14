import BookingModel from "../model/booking.js";
import jwt from "jsonwebtoken";

const bookMatch = async (req, res) => {
    try{
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
        if(decoded.role !== 'Fan'){
            return res.status(401).json({ message: 'Unauthorized: Fan role needed' });
        }
        const matchId = req.body.matchId;
        const reservedSeats = req.body.reservedSeats;
        const userId = decoded.id;
        const booking = new BookingModel({matchId, userId, reservedSeats});
        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    }
    catch(error){
        console.error('Error booking match:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getReservedSeats = async (req, res) => {
    try{
        const matchId = req.params.matchId;
        const matchBookings = await BookingModel.find({matchId});
        const reservedSeats = matchBookings.map(booking => booking.reservedSeats);
        res.status(200).json(reservedSeats);
    }
    catch(error){
        console.error('Error getting reserved seats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { bookMatch, getReservedSeats };