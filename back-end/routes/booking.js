import express from "express";
import { bookMatch, getReservedSeats, deleteBooking, getUserBookings } from "../controller/booking.js";

const bookingRouter = express.Router();
bookingRouter.get("/get-reserved-seats/:matchId", getReservedSeats);
bookingRouter.post("/book-match", bookMatch);
bookingRouter.delete("/delete-booking", deleteBooking);
bookingRouter.get("/get-user-bookings/:matchId", getUserBookings);
export default bookingRouter;