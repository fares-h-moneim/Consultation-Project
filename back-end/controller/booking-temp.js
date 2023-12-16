import BookingTempModel from "../model/booking-temp.js";
import UserModel from "../model/user.js";
import jwt from "jsonwebtoken";
import { io } from "../app.js";
import { Socket } from "socket.io";

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
        const user = await UserModel.findById({ _id: userId });

        var savedBookings = await booking.save();
        savedBookings = {
            match_id: savedBookings.match_id,
            reserved_seats: savedBookings.reserved_seats,
            user_id: savedBookings.user_id,
            username: user.username,
        }
        io.emit("booking", savedBookings, user);

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
        var deletedSeat = await BookingTempModel.findOneAndDelete({ match_id: matchId, reserved_seats: reservedSeats, user_id: userId });
        const user = await UserModel.findById({ _id: userId });
        deletedSeat = {
            match_id: deletedSeat.match_id,
            reserved_seats: deletedSeat.reserved_seats,
            user_id: deletedSeat.user_id,
            username: user.username,
        }
        io.emit("deletedSeat", deletedSeat);
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
