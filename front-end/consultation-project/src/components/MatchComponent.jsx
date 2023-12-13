import React from "react";
import stadium from "../assets/stadium.svg"
import calendar from "../assets/calendar.svg";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import "../styles/Match.css";

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

export default function MatchComponent({ matchDetails }) {

    // TODO : Change Navigator

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
        "ZED": ZED
    }

    const navigate = useNavigate();
    const [match, setMatch] = useState({});

    useEffect(() => {
        async function getMatches() {
            var options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
            var response = await fetch(`http://localhost:3000/match/get-match/${matchDetails._id}`, options);

            if (response.ok) {
                var data = await response.json(); // Move this line up
                const originalDate = new Date(data.match.date_time);

                const opts = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                };

                const formattedDate = new Intl.DateTimeFormat('en-US', opts).format(originalDate);

                const m = {
                    home_team: teams[data.home_team.team_name],
                    away_team: teams[data.away_team.team_name],
                    venue: data.venue.venue_name,
                    date_time: formattedDate,
                    main_referee: data.main_referee.first_name + " " + data.main_referee.last_name,
                    lineman1: data.lineman1.first_name + " " + data.lineman1.last_name,
                    lineman2: data.lineman2.first_name + " " + data.lineman2.last_name
                }

                setMatch(m);
            }
        }

        getMatches();
    }, []);


    return (
        <div className="col match-component">
            <div className="row g-0 align-items-center justify-content-top p-0 m-0 match-details">
                <div className="col-12 col-md-4 text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <img
                            src={match.home_team}
                            alt="Home Team"
                            width={"50px"}
                            className="team-logo"
                        />
                        <h5 className="vs-label">vs</h5>
                        <img
                            src={match.away_team}
                            alt="Away Team"
                            width={"50px"}
                            className="team-logo"
                        />
                    </div>
                </div>
                <div className="col-12 col-md-4 text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={stadium} alt="stadium Image" className="icon" />
                        <h5 className="match-info">{match.venue}</h5>
                    </div>
                </div>
                <div className="col-12 col-md-4 text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={calendar} alt="calendar Image" className="icon" />
                        <h5 className="match-info">{match.date_time}</h5>
                    </div>
                </div>
            </div>
            <div className="row g-0 match-details" >
                <div className="col-12 text-center" >
                    <h5 className="referee-info">
                        Main referee: {match.main_referee}
                    </h5>
                </div>
                <div className="col-12 text-center">
                    <h5 className="referee-info">
                        Two Linesmen: {match.lineman1} / {match.lineman2}
                    </h5>
                </div>
            </div>
            <div className="row g-0 match-buttons">
                <div className="col-12 text-center">
                    {localStorage.getItem("role") !== "Admin" && <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            navigate(`/booking/${matchDetails._id}`);
                        }}
                    >
                        Book Now!
                    </button>}
                </div>
            </div>
        </div>
    );
}