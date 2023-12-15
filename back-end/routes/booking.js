import express from "express";
import { bookMatch, getReservedSeats, deleteBooking, getUserBookings, deletedSeat } from "../controller/booking.js";

const bookingRouter = express.Router();
bookingRouter.get("/get-reserved-seats/:matchId", getReservedSeats);
bookingRouter.post("/book-match", bookMatch);
bookingRouter.delete("/delete-booking", deletedSeat);
bookingRouter.get("/get-user-bookings", getUserBookings);
export default bookingRouter;