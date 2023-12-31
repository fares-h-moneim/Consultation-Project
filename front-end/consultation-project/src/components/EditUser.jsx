import React, { useEffect, useState } from "react";
import MascotImage from "./MascotImage";
import EditUserForm from "./EditUserForm";

export default function EditUser() {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        gender: "Male",
        city: "",
        address: "",
        role: "Manager"
    });

    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                const response = await fetch("https://epl-reservation-backend.vercel.app/user/details", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const userDataResponse = await response.json();
                    userDataResponse.user.birth_date = userDataResponse.user.birth_date.split("T")[0];
                    setUserData(userDataResponse.user);
                } else {
                    console.error("Failed to Retrieve User Data");
                }
            } catch (error) {
                console.error(error);
            }
        };

        getUserData();
    }, []);

    return (
        <div className="container-fluid px-0 content" style={{ height: "auto", overflow: "hidden" }}>
            <div className="row align-items-center">
                <MascotImage />
                <EditUserForm user={userData} />
            </div>
        </div>
    );
}
