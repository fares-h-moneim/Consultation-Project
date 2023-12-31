import React, { useState, useEffect } from 'react';
import StadiumIcon from '../assets/StadiumWhite.png';
import SeatingChart from './SeatingChart'; '../SeatingChart';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import "../styles/SeatChart.css";

import Ahly from '../assets/Teams/Al Ahly.png';
import Ittihad from '../assets/Teams/Al Ittihad.png';
import Masry from '../assets/Teams/Al Masry.png';
import Mokawloon from '../assets/Teams/Al Mokawloon.png';
import Mahala from '../assets/Teams/Baladiyat El Mahalla.png';
import Ceramica from '../assets/Teams/Ceramica Cleopatra.png';
import Dakhleya from '../assets/Teams/El Dakhleya.png';
import Gaish from '../assets/Teams/El Gaish.png';
import Gouna from '../assets/Teams/El Gouna.png';
import Enppi from '../assets/Teams/ENPPI.png';
import Ismaily from '../assets/Teams/Ismaily.png';
import Future from '../assets/Teams/Modern Future.png';
import NBE from '../assets/Teams/National Bank.png';
import Pharco from '../assets/Teams/Pharco.png';
import Pyramids from '../assets/Teams/Pyramids.png';
import Smouha from '../assets/Teams/Smouha.png';
import Zamalek from '../assets/Teams/Zamalek.png';
import ZED from '../assets/Teams/ZED.png';

export default function Booking() {
    const { matchId } = useParams();
    const [numRows, setNumRows] = useState(10);
    const [numCols, setNumCols] = useState(10);
    const [match, setMatch] = useState({});
    const [homeTeamLogo, setHomeTeamLogo] = useState('');
    const [awayTeamLogo, setAwayTeamLogo] = useState('');
    const [timer, setTimer] = useState(300); // Initial time in seconds (5 minutes)
    const [reservedSeats, setReservedSeats] = useState([]);
    const [userTempReservedSeats, setUserTempReservedSeats] = useState([]);
    const navigate = useNavigate();


    const teams = {
        'Al Ahly': Ahly,
        'Al Ittihad': Ittihad,
        'Al Masry': Masry,
        'Al Mokawloon': Mokawloon,
        'Baladiyat El Mahalla': Mahala,
        'Ceramica Cleopatra': Ceramica,
        'El Dakhleya': Dakhleya,
        'El Gaish': Gaish,
        'El Gouna': Gouna,
        ENPPI: Enppi,
        Ismaily: Ismaily,
        'Modern Future': Future,
        'National Bank': NBE,
        Pharco: Pharco,
        Pyramids: Pyramids,
        Smouha: Smouha,
        Zamalek: Zamalek,
        ZED: ZED,
    };
    useEffect(() => {
        const fetchSeatingArrangement = async () => {
            try {
                const response = await fetch(`https://epl-reservation-backend.vercel.app/match/get-match/${matchId}`);
                if (response.ok) {
                    const data = await response.json();
                    setNumRows(data.venue.num_of_rows);
                    setNumCols(data.venue.num_of_seats_per_row);
                    setMatch(data);
                    setHomeTeamLogo(teams[data.home_team.team_name]);
                    setAwayTeamLogo(teams[data.away_team.team_name]);
                } else {
                    console.error('Failed to fetch seating arrangement');
                }
            } catch (error) {
                console.error('Error fetching seating arrangement:', error);
            }
        };

        const getReservedSeats = async () => {
            try {
                const response = await fetch(`https://epl-reservation-backend.vercel.app/booking/get-reserved-seats/${matchId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setReservedSeats(data);
                } else {
                    console.error('Failed to fetch reserved seats');
                }

            } catch (error) {
                console.error('Error fetching reserved seats:', error);
            }
        };
        const getUserTempReservedSeats = async () => {
            try {
                const response = await fetch(`https://epl-reservation-backend.vercel.app/booking-temp/get-user-temp-reserved-seats/${matchId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserTempReservedSeats(data);
                } else {
                    console.error('Failed to fetch reserved seats');
                }

            } catch (error) {
                console.error('Error fetching reserved seats:', error);
            }
        }
        getUserTempReservedSeats();
        getReservedSeats();
        fetchSeatingArrangement();
    }, [matchId]);

    useEffect(() => {
        SeatingChart(matchId, numRows, numCols, reservedSeats, userTempReservedSeats);
    }, [reservedSeats, userTempReservedSeats, numRows, numCols, matchId]);

    function formatDate(date) {
        const originalDate = new Date(date);
        const opts = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        const formattedDate = new Intl.DateTimeFormat('en-UK', opts).format(originalDate);
        return formattedDate
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (timer === 0) {
            //TODO: Your logic when the timer reaches zero (e.g., redirect or show a message)
            window.dispatchEvent(new Event('timerFinished'));
            navigate("/");
        }
    }, [timer]);

    function toString(time) {
        return time > 0 ? (Math.floor(time / 60) + ":" + (time % 60 < 10 ? '0' : '') + time % 60) : "Session Timed Out";
    }
    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            navigate('/signin');
        }
    }, []);

    useEffect(() => {
        window.addEventListener('checkout', (e) => {
            navigate(`/payment/${matchId}`, { state: { eventData: e.detail } });
        });
    }, []);

    return (
        <>
            <div className="container-fluid px-0">
                <div className="row align-items-center justify-content-center pt-5" style={{ height: '92vh' }}>
                    <div className="col-lg-6 col-md-12 text-center">
                        <div>
                            <img className='team-logo' src={homeTeamLogo} alt="Ahly Logo" width={'200px'} />
                            <span className="mx-2 text-white" style={{ fontSize: "40px" }}>&nbsp; VS &nbsp;</span>
                            <img className='team-logo' src={awayTeamLogo} alt="Zamalek Logo" width={'200'} />
                        </div>
                        <div className="mt-3">
                            <p style={{ color: 'white', fontSize: '40px' }}>{match.match && formatDate(match.match.date_time)}</p>
                            <p style={{ color: 'white', fontSize: '40px' }}>
                                <img src={StadiumIcon} alt="Stadium Icon" style={{ marginRight: '10px', width: '75px' }} />
                                {match.venue && match.venue.venue_name}
                            </p>
                        </div>
                    </div>
                    <div className="row text-center">
                        <h5 style={{ color: 'white', fontSize: '30px', marginTop: '10px' }}>
                            {timer > 0 && "Session: " + toString(timer)}
                        </h5>
                    </div>
                    <div className="col-lg-12 col-md-12 mt-4 mt-lg-0 p-5 d-flex justify-content-center align-content-center" style={{ paddingRight: '5%' }}>
                        <div className="seating-container" style={{ backgroundColor: 'white', color: 'red', padding: '0', minWidth: '70%' }}>
                            <div id="container" className='justify-content-center'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
