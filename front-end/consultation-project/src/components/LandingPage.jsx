import MascotImage from "./MascotImage";
import LandingPageText from "./LandingPageText";
import { useState } from "react";

export default function LandingPage() {

    return (
        <div className="container-fluid px-0 content" style={{ backgroundColor: "red", height: "100vh" }}>
            <div className="row align-items-center">
                <LandingPageText />
                <MascotImage />
            </div>
        </div>
    );
}