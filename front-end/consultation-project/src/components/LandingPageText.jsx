import { useEffect, useState } from "react";

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
                var response = await fetch(`http://localhost:3000/match/get-next-match`, options);
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

    function formatDate(date) {
        // Ensure the date string is in a consistent format (ISO 8601)
        const isoString = new Date(date).toISOString();

        // Parse the ISO string
        const originalDate = new Date(isoString);

        // Format options
        const opts = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        // Format the date
        const formattedDate = new Intl.DateTimeFormat('en-UK', opts).format(originalDate);
        return formattedDate;
    }

    return (
        <div className="col center ml-5 text-white">
            <div className="row">
                <div className="text-center">
                    <div className="h1" style={{ fontSize: "100px" }}>Up Next!</div>
                    <br />
                </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <img src={teams[match.home_team]} alt={match.home_team} width={"200px"} className="team-logo" />
                    <span className="h1 ml-2 text-white" style={{ fontSize: "100px" }}>&nbsp; vs &nbsp;</span>
                    <img src={teams[match.away_team]} alt={match.away_team} width={"200px"} className="team-logo" />
                </div>
            </div>
            <div className="row mt-3">
                <div className="text-center">
                    <div className="h4" style={{ fontSize: "50px" }}>{match.date_time}</div>
                </div>
            </div>
        </div>
    );
}
