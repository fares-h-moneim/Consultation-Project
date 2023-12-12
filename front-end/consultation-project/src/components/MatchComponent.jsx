import React, { useState } from "react";
import stadium from "../assets/stadium.svg";
import calendar from "../assets/calendar.svg";
import Ahly from "../assets/Ahly.png";
import Zamalek from "../assets/Zamalek.png";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Match({ matchDetails }) {
    const navigator = () => {
        if (!localStorage.getItem("jwtToken")) {
            window.location.href = "/signin";
        }
        else {
            window.location.href = "/booking";
        }
    }
    const navigate = useNavigate();
    const [match, setMatch] = useState({
        home_team: "../assets/Ahly.png",
        away_team: "../assets/Zamalek.png",
        venue: "Cairo International Stadium",
        date_time: "2021-05-01 20:00",
        main_referee: "Mohamed Farouk",
        lineman1: "Ahmed Mohamed",
        lineman2: "Ahmed Mohamed"
    });

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
                var data = await response.json();
                console.log(data);
                const originalDate = new Date(data.date_time);

                const options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                };

                const formattedDate = new Intl.DateTimeFormat('en-US', options).format(originalDate);
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

    useEffect(() => {
        async function getMatches() {
            var options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
            var response = await fetch("http://localhost:3000/match/get-match/" + matchDetails._id, options);
            if (response.ok) {
                var data = await response.json();
                console.log(data);
                const m = {
                    home_team: data.home_team.name,
                    away_team: data.away_team.name,
                    venue: data.venue.name,
                    date_time: data.date_time,
                    main_referee: data.main_referee,
                    lineman1: data.lineman1,
                    lineman2: data.lineman2
                }
            }
        }

        getMatches();
    }, []);

    return (
        <div className="col" style={{ height: "9vh", width: "80vw" }}>
            <div className="row g-0 align-items-center justify-content-top p-0" style={{ backgroundColor: "white" }}>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={Ahly} alt="Home Team" width={"50px"} />
                        <h5 style={{ marginLeft: "10px" }}> vs &nbsp;</h5>
                        <img src={Zamalek} alt="Away Team" width={"35px"} />
                    </div>
                </div>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={stadium} alt="stadium Image" />
                        <h5 style={{ marginLeft: "10px" }}>{match.venue}</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={calendar} alt="calendar Image" />
                        <h5 style={{ marginLeft: "10px" }}>{match.date_time}</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <button type="button" className="btn btn-danger" onClick={() => { navigate(`/booking/${matchDetails._id}`) }}>Book Now!</button>
                </div>
            </div>
            <div className="row g-0 " style={{ backgroundColor: "grey" }}>
                <div className="col">
                    <p className="p-0 m-0" style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#fff" }}>
                        Main referee : {match.main_referee}
                    </p>
                </div>
                <div className="col">
                    <p className="p-0 m-0" style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#fff" }}>
                        Two Linesmen : {match.lineman1} / {match.lineman2}
                    </p>

                </div>
            </div>
        </div>
    );
}