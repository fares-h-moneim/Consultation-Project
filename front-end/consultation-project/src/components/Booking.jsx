import React, { useState } from 'react';
import StadiumIcon from '../assets/StadiumWhite.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Ahly from "../assets/Teams/Al Ahly.png";
import Ittihad from "../assets/Teams/Al Ittihad.png";
import Masry from "../assets/Teams/Al Masry.png";
import Mokawloon from "../assets/Teams/Al Mokawloon.png";
import Mahala from "../assets/Teams/Baladiyat El Mahalla.png";
import Ceramica from "../assets/Teams/Ceramica Cleopatra.png";
import Dakhleya from "../assets/Teams/El Dakhleya.png";
import Gaish from "../assets/Teams/El Gaish.png";
import Gouna from "../assets/Teams/El Gouna.png";
import Enppi from "../assets/Teams/ENPPI.png";
import Ismaily from "../assets/Teams/Ismaily.png";
import Future from "../assets/Teams/Modern Future.png";
import NBE from "../assets/Teams/National Bank.png";
import Pharco from "../assets/Teams/Pharco.png";
import Pyramids from "../assets/Teams/Pyramids.png";
import Smouha from "../assets/Teams/Smouha.png";
import Zamalek from "../assets/Teams/Zamalek.png";
import ZED from "../assets/Teams/ZED.png";

export default function Booking() {
    const { matchId } = useParams();
    // Define initial state for rows and columns
    const [numRows, setNumRows] = useState(10); // Set the initial number of rows
    const [numCols, setNumCols] = useState(10); // Set the initial number of columns
    const [match, setMatch] = useState({});

    const teams = {
        "Al Ahly": Ahly,
        "Al Ittihad": Ittihad,
        "Al Masry": Masry,
        "Al Mokawloon": Mokawloon,
        "Baladiyat El Mahalla": Mahala,
        "Ceramica Cleopatra": Ceramica,
        "El Dakhleya": Dakhleya,
        "El Gaish": Gaish,
        "El Gouna": Gouna,
        "ENPPI": Enppi,
        "Ismaily": Ismaily,
        "Modern Future": Future,
        "National Bank": NBE,
        "Pharco": Pharco,
        "Pyramids": Pyramids,
        "Smouha": Smouha,
        "Zamalek": Zamalek,
        "ZED": ZED
    }

    const generateSeatingArrangement = () => {
        const seatingArrangement = [];
        for (let row = 0; row < numRows; row++) {
            const rowSeats = [];
            for (let col = 0; col < numCols; col++) {
                const seat = String.fromCharCode(65 + row) + (col + 1);
                rowSeats.push({ seat, selected: false });
            }
            seatingArrangement.push(rowSeats);
        }
        return seatingArrangement;
    };

    const [seatingArrangement, setSeatingArrangement] = useState(generateSeatingArrangement());
    const [selectedSeats, setSelectedSeats] = useState([]);
    useEffect(() => {
        const fetchSeatingArrangement = async () => {
            try {
                const response = await fetch(`http://localhost:3000/get-match/${matchId}`);
                if (response.ok) {
                    const data = await response.json();
                    setNumRows(data.venue.num_of_rows);
                    setNumCols(data.venue.num_of_seats_per_row);
                    setMatch(data);
                } else {
                    console.error('Failed to fetch seating arrangement');
                }
            } catch (error) {
                console.error('Error fetching seating arrangement:', error);
            }
        };
        fetchSeatingArrangement();
    }, [matchId]);

    // Function to handle seat click
    const handleSeatClick = (row, col) => {
        // Update the selected state of the clicked seat
        const updatedSeatingArrangement = seatingArrangement.map((seats, rowIndex) =>
            seats.map((seat, colIndex) => {
                if (rowIndex === row && colIndex === col) {
                    const updatedSeat = { ...seat, selected: !seat.selected };
                    // Update selected seats
                    setSelectedSeats((prevSelectedSeats) =>
                        updatedSeat.selected
                            ? [...prevSelectedSeats, updatedSeat.seat]
                            : prevSelectedSeats.filter((selectedSeat) => selectedSeat !== updatedSeat.seat)
                    );
                    return updatedSeat;
                }
                return seat;
            })
        );
        setSeatingArrangement(updatedSeatingArrangement);
    };

    // Calculate total checkout amount based on the number of selected seats
    const calculateTotalAmount = () => {
        const seatPrice = 10; // Set the price per seat
        return selectedSeats.length * seatPrice;
    };

    return (
        <div className="container-fluid px-0">
            <div className="row align-items-center justify-content-center" style={{ height: "92vh" }}>
                {/* Left side */}
                <div className="col-lg-6 col-md-12 text-center">
                    {/* Team logos, VS, match details */}
                    <div>
                        <img src={Ahly} alt="Ahly Logo" width={"200px"} />
                        <span className="mx-2 text-white">VS</span>
                        <img src={Zamalek} alt="Zamalek Logo" width={"150px"} />
                    </div>
                    <div className="mt-3">
                        <p style={{ color: 'white', fontSize: '40px' }}>12/12/2023 8:00 PM</p>
                        <p style={{ color: 'white', fontSize: '40px' }}>
                            <img
                                src={StadiumIcon}
                                alt="Stadium Icon"
                                style={{ marginRight: '10px', width: "75px" }}
                            />
                            Cairo International Stadium
                        </p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 mt-4 mt-lg-0" style={{ paddingRight: "5%" }}>
                    {/* Render dynamic seating arrangement */}
                    <div className="seating-container" style={{ backgroundColor: "white", color: "red", padding: "5%" }}>
                        {seatingArrangement.map((rowSeats, rowIndex) => (
                            <div key={rowIndex} className="seating-row">
                                {rowSeats.map((seat, colIndex) => (
                                    <button
                                        key={colIndex}
                                        className={`btn ${seat.selected ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={() => handleSeatClick(rowIndex, colIndex)}
                                        style={{ width: "50px", height: "50px" }}
                                    >
                                        {seat.seat}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Receipt */ selectedSeats.length > 0 &&
                <div className="row justify-content-center mt-4">
                    <div className="col text-center" style={{ backgroundColor: "red", padding: "20px", width: "1000px" }}>
                        <div className="d-flex justify-content-center">
                            <div style={{ backgroundColor: "white", borderRadius: "15px", padding: "20px" }}>
                                <h4>Receipt</h4>
                                <ul>
                                    {selectedSeats.map((selectedSeat, index) => (
                                        <li key={index}>{selectedSeat}</li>
                                    ))}
                                </ul>
                                <p>Total Amount: ${calculateTotalAmount()}</p>
                                <button className="btn btn-success">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
