import UserModel from "./user.js";
import VenueModel from "./venue.js";
import TeamModel from "./team.js";
import MatchModel from "./match.js";
import RefereeModel from "./referee.js";
import RequestModel from "./request.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error(err);
    }
};

connectDB();

const fan = new UserModel({
    username: "yehia1",
    password: await bcrypt.hash("123456", 10),
    first_name: "yehia",
    last_name: "yehia",
    birth_date: "1999-12-12",
    gender: "Male",
    city: "Cairo",
    address: "Cairo",
    email: "yehiatarek63@gmail.com",
    role: "Fan"
});
const savedFan = await fan.save();

const manager = new UserModel({
    username: "fares1",
    password: await bcrypt.hash("123456", 10),
    first_name: "Fares",
    last_name: "Hesham",
    birth_date: "2002-04-29",
    gender: "Male",
    city: "Cairo",
    address: "Cairo",
    email: "fares.h.moneim@gmail.com",
    role: "Manager"
});
const savedManager = await manager.save();

const admin = new UserModel({
    username: "ahmed1",
    password: await bcrypt.hash("123456", 10),
    first_name: "Ahmed",
    last_name: "Yasser",
    birth_date: "2001-03-12",
    gender: "Male",
    city: "Cairo",
    address: "Cairo",
    email: "ahmed.yasser@gmail.com",
    role: "Admin"
});
const savedAdmin = await admin.save();

const request = new RequestModel({
    username: "mody1",
    password: await bcrypt.hash("123456", 10),
    first_name: "Mohamed",
    last_name: "Ahmed",
    birth_date: "2001-03-12",
    gender: "Male",
    city: "Cairo",
    address: "Cairo",
    email: "mody.ben@gmail.com",
    role: "Fan"
});
const savedRequest = await request.save();

const venue = new VenueModel({
    venue_name: "Cairo International Stadium",
    location: "Cairo",
    num_of_rows: 5,
    num_of_seats_per_row: 10
});
const savedVenue = await venue.save();

const ahly = new TeamModel({
    team_name: "Ahly",
    logo: "./assets/Ahly.png"
});
const savedAhly = await ahly.save();

const zamalek = new TeamModel({
    team_name: "Zamalek",
    logo: "./assets/Zamalek.png"
});
const savedZamalek = await zamalek.save();

const referee1 = new RefereeModel({
    first_name: "Ahmed",
    last_name: "Ali"
});
const savedReferee1 = await referee1.save();

const referee2 = new RefereeModel({
    first_name: "Mohamed",
    last_name: "Ali"
});
const savedReferee2 = await referee2.save();

const referee3 = new RefereeModel({
    first_name: "Khaled",
    last_name: "Ali"
});
const savedReferee3 = await referee3.save();

const match = new MatchModel({
    home_team: savedAhly._id,
    away_team: savedZamalek._id,
    venue: savedVenue._id,
    date_time: "2021-12-12",
    main_referee: savedReferee1._id,
    lineman1: savedReferee2._id,
    lineman2: savedReferee3._id,
    capacity: 10000
});
const savedMatch = await match.save();

