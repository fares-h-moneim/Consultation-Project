import BookingModel from "../model/booking.js";
import jwt from "jsonwebtoken";

const bookMatch = async (req, res) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }

        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);

        if (decoded.role !== 'Fan') {
            return res.status(401).json({ message: 'Unauthorized: Fan role needed' });
        }

        const matchId = req.body.match_id;
        const reservedSeats = req.body.reserved_seats;
        const userId = decoded.sub;

        const booking = new BookingModel({
            match_id: matchId,
            reserved_seats: reservedSeats,
            user_id: userId
        });

        const savedBookings = await booking.save();

        res.status(201).json(savedBookings);
    } catch (error) {
        console.error('Error booking match:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getReservedSeats = async (req, res) => {
    try {
        const matchId = req.params.matchId;
        var reserved = await BookingModel.find({ matchId: matchId });
        var reservedSeats = [];
        reserved.forEach(booking => {
            reservedSeats.push(booking.reservedSeats);
        });
        res.status(200).json(reservedSeats);
    }
    catch (error) {
        console.error('Error getting reserved seats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }

        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);

        if (decoded.role !== 'Fan') {
            return res.status(401).json({ message: 'Unauthorized: Fan role needed' });
        }

        const matchId = req.body.match_id;
        const reservedSeats = req.body.reserved_seats;
        const userId = decoded.sub;
        console.log(matchId, reservedSeats);
        const booking = await BookingModel.findOneAndDelete({ match_id: matchId, reserved_seats: reservedSeats, user_id: userId });

        res.status(200).json(booking);
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { bookMatch, getReservedSeats, deleteBooking };