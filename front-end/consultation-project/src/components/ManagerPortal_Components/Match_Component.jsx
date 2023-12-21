import React from "react";
import stadium from "../../assets/stadium.svg"
import calendar from "../../assets/calendar.svg";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { toast } from 'react-toastify';
import "../../styles/Match.css";

import Ahly from "../../assets/Teams/Al Ahly.png";
import Ittihad from "../../assets/Teams/Al Ittihad.png";
import Masry from "../../assets/Teams/Al Masry.png";
import Mokawloon from "../../assets/Teams/Al Mokawloon.png";
import Mahala from "../../assets/Teams/Baladiyat El Mahalla.png";
import Ceramica from "../../assets/Teams/Ceramica Cleopatra.png";
import Dakhleya from "../../assets/Teams/El Dakhleya.png";
import Gaish from "../../assets/Teams/El Gaish.png";
import Gouna from "../../assets/Teams/El Gouna.png";
import Enppi from "../../assets/Teams/ENPPI.png";
import Ismaily from "../../assets/Teams/Ismaily.png";
import Future from "../../assets/Teams/Modern Future.png";
import NBE from "../../assets/Teams/National Bank.png";
import Pharco from "../../assets/Teams/Pharco.png";
import Pyramids from "../../assets/Teams/Pyramids.png";
import Smouha from "../../assets/Teams/Smouha.png";
import Zamalek from "../../assets/Teams/Zamalek.png";
import ZED from "../../assets/Teams/ZED.png";


export default function MatchComponent({ matchDetails }, onDelete) {

    // TODO : add delete match functionality
    const [isRemoved, setIsRemoved] = useState(false);
    const deleteMatch = async(e) => {
        try {
            const data = {
                match_id: matchDetails._id
            }
            var options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify(data)
            }
            var response = await fetch(`http://localhost:3000/match/delete-match`, options);
            if (response.ok) {
                toast.success(`🗑️ Match Deleted Successfully`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                setIsRemoved(true);
            }
            else {
                toast.error(`❌ Error Deleting Match Response not ok`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            }
        }
        catch (error) {
            console.log(error);
            toast.error(`❌ Error Deleting Match internal`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
    }
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

                const formattedDate = new Intl.DateTimeFormat('en-UK', opts).format(originalDate);

                const m = {
                    home_team: data.home_team.team_name,
                    away_team: data.away_team.team_name,
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

    if (isRemoved) {
        return null;
    }
    return (
        <div className="col match-component" style={{ maxWidth: '65vw', minWidth: "400px" }}>
            <div className="row g-0 align-items-center justify-content-top p-0 m-0 match-details">
                <div className="col-12 col-md-4 text-center">
                    <div className="d-flex align-items-center justify-content-center py-2">
                        <p className="team-name mt-3">{match.home_team} &nbsp;</p>
                        <img
                            src={teams[match.home_team]}
                            alt="Home Team"
                            width={"50px"}
                            className="team-logo"
                        />
                        <h5 className="vs-label">&nbsp; vs &nbsp;</h5>
                        <img
                            src={teams[match.away_team]}
                            alt="Away Team"
                            width={"50px"}
                            className="team-logo"
                        />
                        <p className="team-name mt-3">{match.away_team}</p>
                    </div>
                </div>
                <div className="col-12 col-md-4 text-center">
                    <div className="d-flex align-items-center justify-content-center py-2">
                        <img src={stadium} alt="stadium Image" className="icon" />
                        <h5 className="match-info">{match.venue}</h5>
                    </div>
                </div>
                <div className="col-12 col-md-4 text-center">
                    <div className="d-flex align-items-center justify-content-center py-2">
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
            <div className="row d-flex g-0 match-buttons">
                <div className="col-12 col-md-4 text-center py-1">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            navigate(`/view-reservations/${matchDetails._id}`);
                        }}
                    >
                        View Reserved Seats
                    </button>
                </div>
                <div className="col-12 col-md-4 text-center py-1r">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            navigate(`/edit-match/${matchDetails._id}`);
                        }}
                    >
                        Edit
                    </button>
                </div>
                <div className="col-12 col-md-4 text-center py-1">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={deleteMatch}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}