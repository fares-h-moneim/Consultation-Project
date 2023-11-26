import React from "react";
import stadium from "../assets/stadium.svg";
import calendar from "../assets/calendar.svg";

export default function Match() {
    return (
        <div className="col" style={{ height: "9vh", width: "80vw" }}>
            <div className="row g-0 align-items-center justify-content-top p-0" style={{ backgroundColor: "white" }}>
                <div className="col text-center">
                    <h3 style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", fontWeight: "bold", color: "#333" }}>
                        Team One vs Team Two
                    </h3>
                </div>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={stadium} alt="stadium Image" />
                        <h5 style={{ marginLeft: "10px" }}>Cairo</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={calendar} alt="calendar Image" />
                        <h5 style={{ marginLeft: "10px" }}>25/5/2021</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <button type="button" class="btn btn-danger">Book Now!</button>
                </div>
            </div>
            <div className="row g-0 " style={{ backgroundColor: "grey" }}>
                <div className="col">
                    <p className="p-0 m-0" style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#fff" }}>
                        Main referee : Ahmed Yasser
                    </p>
                </div>
                <div className="col">
                    <p className="p-0 m-0" style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#fff" }}>
                        Two Linesmen : Ahmed Yasser / Ahmed Yasser
                    </p>

                </div>
            </div>
        </div>
    );
}