import React, { useEffect, useState } from "react";
import MascotImage from "./MascotImage";
import ChangePass from "./ChangePass";

export default function ChangePassPage() {
    return (
        <div className="container-fluid px-0 content" style={{ height: "auto", overflow: "hidden" }}>
            <div className="row align-items-center">
                <MascotImage />
                <ChangePass />
            </div>
        </div>
    );
}
