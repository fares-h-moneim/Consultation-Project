import React from "react";
import MascotImage from "./MascotImage";
import ButtonImage from "./ButtonImage";
import image from "../assets/Ahly.png";

export default function AdminPortal() {
    return (
        <div className="container-fluid px-0 content" style={{ backgroundColor: "red", height: "92vh" }}>
            <div className="row align-items-center">
                <MascotImage />
                <div className="col mt-3 mb-3 ml-5 mr-5">
                    <ButtonImage text="View Users Requests" image={image}></ButtonImage>
                </div>
                <div className="col mt-3 mb-3 ml-5 mr-5">
                    <ButtonImage text="Remove Users" image={image}></ButtonImage>
                </div>
            </div>
        </div>
    );
}
