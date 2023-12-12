import express from 'express';
import {addVenue, getVenueById, getVenues} from '../controller/venue.js';
import {requireManager} from '../controller/passport-setup.js';
const venueRouter = express.Router();
venueRouter.post('/add-venue', addVenue);
venueRouter.get('/get-venue/:venueId', getVenueById);
venueRouter.get('/get-venues', getVenues);
export default venueRouter;