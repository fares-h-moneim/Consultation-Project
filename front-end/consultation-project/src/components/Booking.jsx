import React, { useState, useEffect } from 'react';
import StadiumIcon from '../assets/StadiumWhite.png';
import SeatingChart from './SeatingChart'; '../SeatingChart';
import { useNavigate, useParams } from 'react-router-dom';

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
                const response = await fetch(`http://localhost:3000/match/get-match/${matchId}`);
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
        fetchSeatingArrangement();
    }, [matchId]);

    useEffect(() => {
        SeatingChart(match, numRows, numCols);
    }, [numRows, numCols]);

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

        const formattedDate = new Intl.DateTimeFormat('en-US', opts).format(originalDate);
        return formattedDate
    }

    return (
        <>
            <div className="container-fluid px-0">
                <div className="row align-items-center justify-content-center" style={{ height: '92vh' }}>
                    <div className="col-lg-6 col-md-12 text-center">
                        <div>
                            <img src={homeTeamLogo} alt="Ahly Logo" width={'200px'} />
                            <span className="mx-2 text-white" style={{ fontSize: "40px" }}>&nbsp; VS &nbsp;</span>
                            <img src={awayTeamLogo} alt="Zamalek Logo" width={'200'} />
                        </div>
                        <div className="mt-3">
                            <p style={{ color: 'white', fontSize: '40px' }}>{match.match && formatDate(match.match.date_time)}</p>
                            <p style={{ color: 'white', fontSize: '40px' }}>
                                <img src={StadiumIcon} alt="Stadium Icon" style={{ marginRight: '10px', width: '75px' }} />
                                {match.venue && match.venue.venue_name}
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-12 mt-4 mt-lg-0" style={{ paddingRight: '5%' }}>
                        <div className="seating-container" style={{ backgroundColor: 'white', color: 'red', padding: '5%' }}>
                            <div id="container"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
