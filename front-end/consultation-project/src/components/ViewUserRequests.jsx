import UserRequest from "./UserRequests";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function ViewUserRequests() {
    const [requests, setRequests] = useState([]);
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

    useEffect(() => {
        async function getRequests() {
            var options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                }
            }
            var response = await fetch(`http://localhost:3000/request/get-all-requests`, options);
            if (response.ok) {
                setRequests(await response.json());
            }
        }

        getRequests();
    }, []);

    return (
        <div className="container-fluid px-0 content align-items-center justify-content-center" style={{ height: "92vh" }}>
            <div className="d-flex flex-column align-items-center justify-content-center m-4">
                {requests && requests.map((request) => (
                    <UserRequest user={request} key={request.id} />
                ))}
            </div>
        </div>
    );
}