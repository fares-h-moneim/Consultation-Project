import BookingTempModel from "../model/booking-temp.js";
import jwt from "jsonwebtoken";

const bookTempMatch = async (req, res) => {
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

        const booking = new BookingTempModel({
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

const deletedSeat = async (req, res) => {
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
        const deletedSeat = await BookingTempModel.findOneAndDelete({ match_id: matchId, reserved_seats: reservedSeats, user_id: userId });

        res.status(200).json(deletedSeat);
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserTempReservedSeats = async (req, res) => {
    try{
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
        const matchId = req.params.matchId;
        var tempReserved = await BookingTempModel.find({match_id: matchId , user_id: decoded.sub }, {expires_at: 0});
        var reservedSeats = [];
        tempReserved.forEach(booking => {
            reservedSeats.push(booking.reserved_seats);
        });
        res.status(200).json(reservedSeats);
    }
    catch (error) {
        console.error('Error getting reserved seats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export {bookTempMatch, deletedSeat, getUserTempReservedSeats};
