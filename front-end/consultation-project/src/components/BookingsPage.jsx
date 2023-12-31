import React, { useState, useEffect } from 'react';
import UserBookings from "./UserBookings";

export default function BookingsPage() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        async function getBookings() {
            var options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            }
            var response = await fetch("https://epl-reservation-backend.vercel.app/booking/get-user-bookings", options);
            var data = await response.json();
            setMatches(data);
            console.log(data);
        }

        getBookings();
    }, []);
    const handleDelete = (bookingId) => {
        setMatches((prevMatches) =>
            prevMatches.filter((match) => match._id !== bookingId)
        );
    };

    return (
        <div className="container-fluid px-0 content align-items-center justify-content-center" style={{ height: "100%" }}>
            {matches.map((match, index) => (
                <div key={index} className="d-flex align-items-center justify-content-center m-4">
                    <UserBookings matchDetails={match.match_id} seat={match.reserved_seats} bookingId={match._id} onDelete={handleDelete} />
                </div>
            ))}
        </div>
    );
}