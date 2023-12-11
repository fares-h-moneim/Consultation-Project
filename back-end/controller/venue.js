import VenueModel from "../model/venue.js";

const addVenue = async (req, res) => {
    try {
        const newVenueData = req.body;
        const venue = new VenueModel(newVenueData);
        const savedVenue = await venue.save();
        res.status(201).json(savedVenue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getVenueById = async (req, res) => {
    try {
        const venueId = req.params.venueId;
        const venue = await VenueModel.findById(venueId);
        if (venue) {
            res.status(200).json(venue);
        } else {
            res.status(404).json({ error: "Venue not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export {addVenue, getVenueById};