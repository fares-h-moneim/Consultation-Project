import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EditMatchForm({ matchDetails, matchId }) {
  const [matchData, setMatchData] = useState(matchDetails);

  const [errors, setErrors] = useState({});

  //endpoint to update: http://localhost:3000/match/update-match
  //TODO: Edit match functionality

    //Update local state when matchDetails prop changes
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (validateForm()) {
          var options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
            },
            body: JSON.stringify(matchData)
          }
          var response = await fetch("http://localhost:3000/match/update-match", options);
          if (response.ok) {
            var data = await response.json();
            console.log(data);
            toast.success(`Match Edited Successfully`, {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
            });
          }
        }
      }
      catch (error) {
        toast.error(`Error Editing Match`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        console.error(error);
      }
    }


  
  useEffect(() => {
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

      setErrors(newErrors);
      return isValid;
    };
  }, [matchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("lineman")) {
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
  };

  console.log(matchData);

  return (
    <div className="col mt-3 mb-3 ml-5 mr-5">
      <div className="card rounded-2">
        <div className="card-header text-center">
          <div className="h3 mb-0">Edit Match</div>
        </div>
        <div className="card-body">
          <form
            className="form needs-validation"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="homeTeam">Home Team</label>
                <select
                  className="form-control form-control-md rounded-0"
                  name="homeTeam"
                  id="homeTeam"
                  required
                  value={matchData.home_team.team_name}
                  onChange={handleChange}
                  selected={matchData.home_team}
                >
                  <option value="">Select Home Team</option>
                  {teams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
                {errors.homeTeam && (
                  <div className="text-danger">{errors.homeTeam}</div>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="awayTeam">Away Team</label>
                <select
                  className="form-control form-control-md rounded-0"
                  name="awayTeam"
                  id="awayTeam"
                  required
                  value={matchData.away_team}
                  onChange={handleChange}
                  selected={matchData.away_team}
                >
                  <option value="">Select Away Team</option>
                  {teams
                    .filter((team) => team !== matchData.homeTeam)
                    .map((team) => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                </select>
                {errors.awayTeam && (
                  <div className="text-danger">{errors.awayTeam}</div>
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
                  selected={matchData.venue}
                >
                  <option value="">Select Match Venue</option>
                  {stadiums.map((stadium) => (
                    <option key={stadium} value={stadium}>
                      {stadium}
                    </option>
                  ))}
                </select>
                {errors.venue && <div className="text-danger">{errors.venue}</div>}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="dateTime">Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-control form-control-md rounded-0"
                  name="dateTime"
                  id="dateTime"
                  required
                  value={matchData.date_time}
                  onChange={handleChange}
                />
                {errors.dateTime && (
                  <div className="text-danger">{errors.dateTime}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="mainReferee">Main Referee</label>
                <input
                  type="text"
                  className="form-control form-control-md rounded-0"
                  name="mainReferee"
                  id="mainReferee"
                  required
                  value={matchData.main_referee}
                  onChange={handleChange}
                />
                {errors.mainReferee && (
                  <div className="text-danger">{errors.mainReferee}</div>
                )}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="linesman1">Linesman 1</label>
                <input
                  type="text"
                  className="form-control form-control-md rounded-0"
                  name="linesmen.linesman1"
                  id="linesman1"
                  required
                  value={matchData.lineman1}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="linesman2">Linesman 2</label>
                <input
                  type="text"
                  className="form-control form-control-md rounded-0"
                  name="linesmen.linesman2"
                  id="linesman2"
                  required
                  value={matchData.lineman2}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg float-right">
              Save Changes
            </button>
            <Link to="/view-matches" className="btn btn-secondary btn-lg float-right mr-2">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
