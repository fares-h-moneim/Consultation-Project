import { useEffect, useState } from "react";
import "../styles/LandingPageText.css"


import Ahly from "../assets/Teams/Al Ahly.png";
import Ittihad from "../assets/Teams/Al Ittihad.png";
import Masry from "../assets/Teams/Al Masry.png";
import Mokawloon from "../assets/Teams/Al Mokawloon.png";
import Mahala from "../assets/Teams/Baladiyat El Mahalla.png";
import Ceramica from "../assets/Teams/Ceramica Cleopatra.png";
import Dakhleya from "../assets/Teams/El Dakhleya.png";
import Gaish from "../assets/Teams/El Gaish.png";
import Gouna from "../assets/Teams/El Gouna.png";
import Enppi from "../assets/Teams/ENPPI.png";
import Ismaily from "../assets/Teams/Ismaily.png";
import Future from "../assets/Teams/Modern Future.png";
import NBE from "../assets/Teams/National Bank.png";
import Pharco from "../assets/Teams/Pharco.png";
import Pyramids from "../assets/Teams/Pyramids.png";
import Smouha from "../assets/Teams/Smouha.png";
import Zamalek from "../assets/Teams/Zamalek.png";
import ZED from "../assets/Teams/ZED.png";

export default function LandingPageText({ bigText = "Hello World!" }) {
    const [match, setMatch] = useState({});
    const [dateTime, setDateTime] = useState("");

    const teams = {
        "Al Ahly": Ahly,
        "Al Ittihad": Ittihad,
        "Al Masry": Masry,
        "Al Mokawloon": Mokawloon,
        "Baladiyat El Mahalla": Mahala,
        "Ceramica Cleopatra": Ceramica,
        "El Dakhleya": Dakhleya,
        "El Gaish": Gaish,
        "El Gouna": Gouna,
        "ENPPI": Enppi,
        "Ismaily": Ismaily,
        "Modern Future": Future,
        "National Bank": NBE,
        "Pharco": Pharco,
        "Pyramids": Pyramids,
        "Smouha": Smouha,
        "Zamalek": Zamalek,
        "ZED": ZED,
    };

    useEffect(() => {
        const getNextMatch = async () => {
            try {
                var options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                };
                var response = await fetch(`https://epl-reservation-backend.vercel.app//match/get-next-match`, options);
                if (response.ok) {
                    var data = await response.json();
                    setMatch({
                        home_team: data.home_team.team_name, // Fix typo here
                        away_team: data.away_team.team_name, // Fix typo here
                        date_time: data.match.date_time,
                        venue: data.venue.venue_name,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        getNextMatch();
    }, []);

    useEffect(() => {
        if (match.date_time) {
            var date = new Date(match.date_time);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';

            var dateStr = `${day}/${month}/${year}`;
            var timeStr = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
            setDateTime(`${dateStr}, ${timeStr}`);
        }
    }, [match]);

    return (
        match.home_team ? (<div className="col center ml-5 text-white">
            <div className="row">
                <div className="text-center">
                    <div className="h1" style={{ fontSize: "7rem" }}>Up Next!</div>
                    <br />
                </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <img src={teams[match.home_team]} alt={match.home_team} width={"200px"} className="team-logo" />
                    <span className="h1 ml-2 text-white" style={{ fontSize: "5rem" }}>&nbsp; vs &nbsp;</span>
                    <img src={teams[match.away_team]} alt={match.away_team} width={"200px"} className="team-logo" />
                </div>
            </div>
            <div className="row mt-3">
                <div className="text-center">
                    <div className="h4" style={{ fontSize: "3.5rem" }}>{dateTime}</div>
                </div>
            </div>
        </div>) : (<>
            <div className="col center ml-5 text-white">
                <div className="row">
                    <div className="text-center">
                        <div className="h1" style={{ fontSize: "7rem" }}>More Matches Coming Soon</div>
                        <br />
                    </div>
                </div>
            </div>
        </>)
    );
}
