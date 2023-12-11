import express from 'express';
import {addVenue, getVenueById} from '../controller/venue.js';
import {requireManager} from '../controller/passport-setup.js';
const venueRouter = express.Router();
venueRouter.post('/add-venue', requireManager, addVenue);
venueRouter.get('/get-venue/:venueId', getVenueById);

export default venueRouter;