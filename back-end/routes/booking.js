import express from "express";
import {bookMatch, getReservedSeats} from "../controller/booking.js";

const bookingRouter = express.Router();
bookingRouter.get("/get-reserved-seats/:matchId", getReservedSeats);
bookingRouter.post("/book-match", bookMatch);
export default bookingRouter;