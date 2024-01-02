import User from "./Users.jsx";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function ViewUsers() {
    const [users, setUsers] = useState([]);
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
        async function getUsers() {
            var options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                }
            }
            var response = await fetch(`http://localhost:3000/user/get-all-users`, options);
            if (response.ok) {
                setUsers(await response.json());
            }
        }

        getUsers();
    }, []);

    return (
        <div className="container-fluid px-0 content align-items-center justify-content-center" style={{ height: "92vh" }}>
            <div className="d-flex flex-column align-items-center justify-content-center m-4">
                {users && users.map((user) => (
                    <User user={user} key={user.id} />
                ))}
            </div>
        </div>
    );
}
