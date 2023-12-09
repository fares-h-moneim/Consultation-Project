import React, { useEffect, useState } from "react";
import MascotImage from "./MascotImage";
import SignUp from "./SignUp";

export default function EditUser() {
    const [userData, setUserData] = useState({});

    /*useEffect(() => {
        const getUserData = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                const response = await fetch("http://localhost:3000/user/details", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const userDataResponse = await response.json();
                    setUserData(userDataResponse);
                    console.log(userDataResponse);
                } else {
                    console.error("Failed to Retrieve User Data");
                }
            } catch (error) {
                console.error(error);
            }
        };

        getUserData();
    }, []);*/

    return (
        <div className="container-fluid px-0 content" style={{ backgroundColor: "red", height: "auto" }}>
            <div className="row align-items-center">
                <MascotImage />
                <SignUp text="Edit Profile" />
            </div>
        </div>
    );
}
