import React from "react";
import MascotImage from "./MascotImage";
import ButtonImage from "./ButtonImage";
import userPlus from "../assets/user-plus-solid.svg";
import trash from "../assets/trash-solid.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";


export default function AdminPortal() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("role") !== "Admin") {
            navigate("/signin");
            toast.error(`⚽ Please sign in as a admin!`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                icon: false
            });
            return;
        }
    }, []);
    return (
        <div className="container-fluid px-0 content" style={{ height: "92vh" }}>
            <div className="row align-items-center">
                <MascotImage />
                <div className="col">
                    <div className="d-flex justify-content-center row align-items-center">
                        <div className="d-flex justify-content-center col text-center">
                            <p className="display-3 text-white" style={{ fontWeight: "bolder" }}>Hello {localStorage.getItem("username")}!</p>
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
