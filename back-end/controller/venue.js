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

export default addVenue;