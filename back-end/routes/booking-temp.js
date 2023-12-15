import express from "express";
import {bookTempMatch, deletedSeat, getUserTempReservedSeats} from "../controller/booking-temp.js";
const bookingTempRouter = express.Router();
bookingTempRouter.post("/book-temp-match", bookTempMatch);
bookingTempRouter.delete("/delete-temp-booking", deletedSeat);
bookingTempRouter.get("/get-user-temp-reserved-seats/:matchId", getUserTempReservedSeats);
export default bookingTempRouter;