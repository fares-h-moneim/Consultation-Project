import React, { useState } from 'react';
import Ahly from '../assets/Ahly.png';
import Zamalek from '../assets/Zamalek.png';
import StadiumIcon from '../assets/StadiumWhite.png';

export default function Booking() {
    // Define initial state for rows and columns
    const [numRows, setNumRows] = useState(10); // Set the initial number of rows
    const [numCols, setNumCols] = useState(10); // Set the initial number of columns

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
