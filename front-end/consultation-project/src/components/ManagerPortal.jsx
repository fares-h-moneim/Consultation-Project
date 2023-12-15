import React from "react";
import MascotImage from "./MascotImage";
import ButtonImage from "./ButtonImage";
import football from "../assets/futbol-regular.svg";
import Stadium from "../assets/StadiumRed.png";
import { useNavigate } from 'react-router-dom';

export default function ManagerPortal() {
    const navigate = useNavigate();
    return (
        <div className="container-fluid px-0 content" style={{ height: "92vh" }}>
            <div className="row align-items-center">
                <MascotImage />
                <div className="col">
                    <div className="row align-items-center">
                        <div className="col text-center">
                            <p className="display-3 text-white" style={{ fontWeight: "bolder" }}>Hello {localStorage.getItem("username")}!</p>
                        </div>
                    </div>
                    <div className="row align-items-center px-5">
                        {/* 3 Buttons in the first row */}
                        <div className="col mt-3 mb-3">
                            <ButtonImage text="Add Match" image={football} width="100%" height="auto" onClick={() => { navigate("/add-match") }} />
                        </div>
                        <div className="col mt-3 mb-3">
                            <ButtonImage text="View Matches" image={football} width="100%" height="auto" onClick={() => { navigate("/view-matches") }} />
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center px-5">
                        <div className="col mt-3 mb-3">
                            <ButtonImage text="Add Stadium" image={Stadium} width="50%" height="auto" onClick={() => { navigate("/add-stadium") }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
