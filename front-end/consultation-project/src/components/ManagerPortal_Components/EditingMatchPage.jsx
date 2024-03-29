import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MascotImage from "../MascotImage";
import EditMatchForm from "./editingMatchComponent";
import { useState, useEffect } from "react";

export default function EditingMatch() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("role") !== "Manager") {
            navigate("/signin");
            toast.error(`⚽ Please sign in as a manager!`, {
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
    const { matchId } = useParams();
    const [match, setMatch] = useState({
        home_team: "Ahly",
        away_team: "Zamalek",
        venue: "Cairo International Stadium",
        date_time: "2021-05-01 20:00",
        main_referee: "Mohamed Farouk",
        lineman1: "Ahmed Mohamed",
        lineman2: "Ahmed Mohamed"
    });

    useEffect(() => {
        async function getMatches() {
            try {
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                };

                console.log(`MATCH ID ${matchId}`);
                const response = await fetch(
                    `http://localhost:3000/match/get-match/${matchId}`,
                    options
                );

                if (response.ok) {
                    const data = await response.json();
                    const updatedMatch = {
                        home_team: data.home_team.team_name,
                        away_team: data.away_team.team_name,
                        venue: data.venue.venue_name,
                        date_time: data.match.date_time,
                        main_referee:
                            data.main_referee.first_name +
                            " " +
                            data.main_referee.last_name,
                        lineman1:
                            data.lineman1.first_name +
                            " " +
                            data.lineman1.last_name,
                        lineman2:
                            data.lineman2.first_name +
                            " " +
                            data.lineman2.last_name,
                    };

                    setMatch(updatedMatch);
                }
            } catch (error) {
                console.error(error);
            }
        }

        getMatches();
    }, [matchId]);

    return (
        <div
            className="container-fluid px-0 content"
            style={{ height: "92vh" }}
        >
            <div className="row align-items-center">
                <MascotImage />
                <EditMatchForm matchDetails={match} matchId = {matchId} />
            </div>
        </div>
    );
}
