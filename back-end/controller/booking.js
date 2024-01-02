import BookingModel from "../model/booking.js";
import BookingTempModel from "../model/booking-temp.js";
import UserModel from "../model/user.js";
import { io } from "../app.js";
import jwt from "jsonwebtoken";
import MatchModel from "../model/match.js";

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
        const checkout = req.body.reserved_seats;
        const reservedSeats = checkout.checkout;
        const userId = decoded.sub;
        const savedBookings = await Promise.all(reservedSeats.map(async seat => {
            const booking = new BookingModel({
                match_id: matchId,
                reserved_seats: seat.index,
                user_id: userId
            });
            return await booking.save();
        }));
        const deleteTempBookings = await BookingTempModel.deleteMany({ match_id: matchId, user_id: userId });
        res.status(201).json(savedBookings);
    } catch (error) {
        console.error('Error booking match:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getReservedSeats = async (req, res) => {
    try {
        const matchId = req.params.matchId;
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
        var reserved = await BookingModel.find({ match_id: matchId });
        var tempReserved = await BookingTempModel.find({ match_id: matchId, user_id: { $ne: decoded.sub } }, { expires_at: 0 });
        var reservedSeats = [];
        reserved.forEach(booking => {
            reservedSeats.push(booking.reserved_seats);
        });
        tempReserved.forEach(booking => {
            reservedSeats.push(booking.reserved_seats);
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
        let result = []
        reservedSeats.forEach(async seat => {
            const deletedSeat = await BookingModel.findOneAndDelete({ match_id: matchId, reserved_seats: seat, user_id: userId });
            result.push(deletedSeat);
        });

        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
        const userId = decoded.sub;
        const bookings = await BookingModel.find({ user_id: userId });
        res.status(200).json(bookings);
    }
    catch (error) {
        console.error('Error getting user bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deletedSeat = async (req, res) => {
    try{
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Missing token' });
        }

        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);

        if (decoded.role !== 'Fan') {
            return res.status(401).json({ message: 'Unauthorized: Fan role needed' });
        }
        // get match from BookingModel
        const getSeat = await BookingModel.findOne({ _id: req.body.booking_id });
        const match = await MatchModel.findOne({ _id: getSeat.match_id });
        // check if match is in the past
        const matchDate = new Date(match.date_time);
        const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;

        if (matchDate.getTime() <= Date.now() + threeDaysInMilliseconds) {
            return res.status(400).json({ message: "Can't cancel three days in advance" });
        }
        const booking_id = req.body.booking_id;
        var deletedSeat = await BookingModel.findOneAndDelete({ _id: booking_id });
        const user = await UserModel.findById({ _id: decoded.sub });
        deletedSeat = {
            match_id: deletedSeat.match_id,
            reserved_seats: deletedSeat.reserved_seats,
            user_id: deletedSeat.user_id,
            username: user.username,
        }
        io.emit("deletedPermSeat", deletedSeat);
        res.status(200).json(deletedSeat);
    }
    catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { bookMatch, getReservedSeats, deleteBooking, getUserBookings, deletedSeat };