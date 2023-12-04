import React from "react";
import stadium from "../assets/stadium.svg";
import calendar from "../assets/calendar.svg";

export default function Match(props) {
    return (
        <div className="col" style={{ height: "9vh", width: "80vw" }}>
            <div className="row g-0 align-items-center justify-content-top p-0" style={{ backgroundColor: "white" }}>
                <div className="col text-center">
                    <h3 style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", fontWeight: "bold", color: "#333" }}>
                             {props.home_team +'vs'+props.away_team}
                    </h3>
                </div>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={stadium} alt="stadium Image" />
                        <h5 style={{ marginLeft: "10px" }}>{props.venue}</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={calendar} alt="calendar Image" />
                        <h5 style={{ marginLeft: "10px" }}>{props.date_time}</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <button type="button" class="btn btn-danger">Book Now!</button>
                </div>
            </div>
            <div className="row g-0 " style={{ backgroundColor: "grey" }}>
                <div className="col">
                    <p className="p-0 m-0" style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#fff" }}>
                         Main referee : {props.main_referee}
                    </p>
                </div>
                <div className="col">
                    <p className="p-0 m-0" style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#fff" }}>
                          Two Linesmen : {props.lineman1} / {props.lineman2}
                    </p>

                </div>
            </div>
        </div>
    );
}