import React, { useState } from "react";
import stadium from "../assets/stadium.svg";
import calendar from "../assets/calendar.svg";
import Ahly from "../assets/Ahly.png";
import Zamalek from "../assets/Zamalek.png";

export default function Match({ matchDetails }) {
    const navigator = () => {
        if (!localStorage.getItem("jwtToken")) {
            window.location.href = "/signin";
        }
        else {
            window.location.href = "/booking";
        }
    }
    const [match, setMatch] = useState({
        home_team: "../assets/Ahly.png",
        away_team: "../assets/Zamalek.png",
        venue: "Cairo International Stadium",
        date_time: "2021-05-01 20:00",
        main_referee: "Mohamed Farouk",
        lineman1: "Ahmed Mohamed",
        lineman2: "Ahmed Mohamed"

    });

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
                    <button type="button" className="btn btn-danger" onClick={navigator}>Book Now!</button>
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