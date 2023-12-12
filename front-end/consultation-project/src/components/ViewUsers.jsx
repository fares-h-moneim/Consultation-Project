import User from "./Users.jsx";
import { useState, useEffect } from "react";

export default function ViewUsers() {
    const [users, setUsers] = useState([]);

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
        <div className="container-fluid px-0 content align-items-center justify-content-center" style={{ backgroundColor: "red", height: "92vh" }}>
            <div className="d-flex flex-column align-items-center justify-content-center m-4">
                {users && users.map((user) => (
                    <User user={user} key={user.id} />
                ))}
            </div>
        </div>
    );
}
