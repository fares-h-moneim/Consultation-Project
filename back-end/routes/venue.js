import express from 'express';
import addVenue from '../controller/venue.js';
import {requireManager} from '../controller/passport-setup.js';
const venueRouter = express.Router();
venueRouter.post('/add-venue', requireManager, addVenue);

export default venueRouter;