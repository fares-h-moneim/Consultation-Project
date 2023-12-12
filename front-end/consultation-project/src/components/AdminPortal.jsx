import React from "react";
import MascotImage from "./MascotImage";
import ButtonImage from "./ButtonImage";
import userPlus from "../assets/user-plus-solid.svg";
import trash from "../assets/trash-solid.svg";
import { useNavigate } from "react-router-dom";

export default function AdminPortal() {
    const navigate = useNavigate();
    return (
        <div className="container-fluid px-0 content" style={{ backgroundColor: "red", height: "92vh" }}>
            <div className="row align-items-center">
                <MascotImage />
                <div className="col">
                    <div className="row align-items-center">
                        <div className="col text-center">
                            {/*TODO: Change the text to the admin name*/}
                            <p className="display-3 text-white" style={{ fontWeight: "bolder" }}>Hello Admin!</p>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col mt-3 mb-3 ml-5 mr-5">
                            <ButtonImage text="View Users Requests" image={userPlus} onClick={() => { navigate("/view-requests") }}></ButtonImage>
                        </div>
                        <div className="col mt-3 mb-3 ml-5 mr-5">
                            <ButtonImage text="Remove Users" image={trash} onClick={() => { navigate("/view-users") }}></ButtonImage>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
