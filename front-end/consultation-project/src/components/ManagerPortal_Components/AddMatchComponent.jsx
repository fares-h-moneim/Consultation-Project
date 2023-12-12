import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddMatchForm = () => {
    const navigate = useNavigate();
    const [matchData, setMatchData] = useState({
        home_team: "",
        away_team: "",
        venue: "",
        date_time: "",
        main_referee: "",
        lineman1: "",
        lineman2: "",
        capacity: 0,
        booked_fans: []
    });
    const [venues, setVenues] = useState([]);
    const [referees, setReferees] = useState([]);
    const [errors, setErrors] = useState({});
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        const getVenues = async () => {
            try {
                var options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
                const response = await fetch("http://localhost:3000/venue/get-venues", options);
                if (response.ok) {
                    const data = await response.json();
                    setVenues(data);
                } else {
                    console.error("Failed to fetch venues");
                }
            } catch (error) {
                console.error("Error fetching venues:", error);
            }
        }
        const getReferees = async () => {
            try {
                var options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
                const response = await fetch("http://localhost:3000/referee/get-referees", options);
                if (response.ok) {
                    const data = await response.json();
                    setReferees(data);
                } else {
                    console.error("Failed to fetch referees");
                }
            } catch (error) {
                console.error("Error fetching referees:", error);
            }
        }
        const getTeams = async () => {
            try {
                var options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                }
                const response = await fetch("http://localhost:3000/team/get-all-teams", options);
                if (response.ok) {
                    const data = await response.json();
                    setTeams(data);
                }
                else {
                    console.error("Failed to fetch teams");
                }
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        }

        //TODO: get team ID and not team name
        getTeams();
        getVenues();
        getReferees();
    }, []);

    //TODO: make sure the referee and both linesmen are different like we did with the home and away teams

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If the property is nested (e.g., linesmen.lineman1)
        if (name.includes("linesmen")) {
            const [parentName, nestedName] = name.split(".");

            setMatchData((prevData) => ({
                ...prevData,
                [parentName]: {
                    ...prevData[parentName],
                    [nestedName]: value,
                },
            }));
        } else {
            setMatchData({
                ...matchData,
                [name]: value,
            });
        }

        setErrors({
            ...errors,
            [name]: "",
        });
    };


    const validateForm = () => {
        let isValid = true;
        const newErrors = {};


        for (const key in matchData) {
            if (matchData[key] === "") {
                newErrors[key] = "This field is required";
                isValid = false;
            }
        }


        if (matchData.homeTeam === matchData.awayTeam) {
            newErrors.awayTeam = "Away team should be different from the home team";
            isValid = false;
        }

        if (matchData.date_time < new Date().toISOString()) {
            newErrors.date_time = "Date and time must be in the future";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            var options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                },
                body: JSON.stringify(matchData)
            }
            const response = await fetch("http://localhost:3000/match/add-match", options);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate("/");
            } else {
                console.error("Failed to add match");
            }
        }
        catch (error) {
            console.error("Error adding match:", error);
        }
        console.log("Match data submitted:", matchData);
    };

    return (
        <div className="col mt-3 mb-3 ml-5 mr-5">
            <div className="card rounded-2">
                <div className="card-header text-center">
                    <div className="h3 mb-0">Add Match</div>
                </div>
                <div className="card-body">
                    <form
                        className="form needs-validation"
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="home_team">Home Team</label>
                                <select
                                    className="form-control form-control-md rounded-0"
                                    name="home_team"
                                    id="home_team"
                                    required
                                    value={matchData.home_team}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Home Team</option>
                                    {teams.map((team) => (
                                        <option key={team._id} value={team.team_name}>
                                            {team.team_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.home_team && (
                                    <div className="text-danger">{errors.home_team}</div>
                                )}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="away_team">Away Team</label>
                                <select
                                    className="form-control form-control-md rounded-0"
                                    name="away_team"
                                    id="away_team"
                                    required
                                    value={matchData.away_team}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Away Team</option>
                                    {teams
                                        .filter((team) => team.team_name !== matchData.home_team)
                                        .map((team) => (
                                            <option key={team._id} value={team.team_name}>
                                                {team.team_name}
                                            </option>
                                        ))}
                                </select>
                                {errors.awayTeam && (
                                    <div className="text-danger">{errors.away_team}</div>
                                )}
                            </div>
                        </div>


                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="venue">Match Venue</label>
                                <select
                                    className="form-control form-control-md rounded-0"
                                    name="venue"
                                    id="venue"
                                    required
                                    value={matchData.venue}
                                    onChange={handleChange}
                                >
                                    {venues.length > 0 && (
                                        <>
                                            <option value="">Select Match Venue</option>
                                            {venues.map((venue) => (
                                                <option key={venue._id} value={venue._id}>
                                                    {venue.venue_name}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </select>
                                {errors.venue && <div className="text-danger">{errors.venue}</div>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="date_time">Date & Time</label>
                                <input
                                    type="datetime-local"
                                    className="form-control form-control-md rounded-0"
                                    name="date_time"
                                    id="date_time"
                                    required
                                    value={matchData.date_time}
                                    onChange={handleChange}
                                />
                                {errors.date_time && (
                                    <div className="text-danger">{errors.date_time}</div>
                                )}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="main_referee">Main Referee</label>
                                <select
                                    className="form-control form-control-md rounded-0"
                                    name="main_referee"
                                    id="main_referee"
                                    required
                                    value={matchData.main_referee}
                                    onChange={handleChange}
                                >
                                    {referees.length > 0 && (
                                        <>
                                            <option value="">Select Main Referee</option>
                                            {referees.map((referee) => (
                                                <option key={referee._id} value={referee._id}>
                                                    {referee.first_name + " " + referee.last_name}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lineman1">Linesman 1</label>
                                <select
                                    className="form-control form-control-md rounded-0"
                                    name="lineman1"
                                    id="lineman1"
                                    required
                                    value={matchData.lineman1}
                                    onChange={handleChange}
                                >
                                    {referees.length > 0 && (
                                        <>
                                            <option value="">Select Linesman 1</option>
                                            {referees.map((referee) => (
                                                <option key={referee._id} value={referee._id}>
                                                    {referee.first_name + " " + referee.last_name}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lineman2">Linesman 2</label>
                                <select
                                    className="form-control form-control-md rounded-0"
                                    name="lineman2"
                                    id="lineman2"
                                    required
                                    value={matchData.lineman2}
                                    onChange={handleChange}
                                >
                                    {referees.length > 0 && (
                                        <>
                                            <option value="">Select Linesman 2</option>
                                            {referees.map((referee) => (
                                                <option key={referee._id} value={referee._id}>
                                                    {referee.first_name + " " + referee.last_name}
                                                </option>
                                            ))}
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>
                        {/* ... */}
                        <button
                            type="submit"
                            className="btn btn-danger btn-lg float-right"
                        >
                            Add Match
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMatchForm;
