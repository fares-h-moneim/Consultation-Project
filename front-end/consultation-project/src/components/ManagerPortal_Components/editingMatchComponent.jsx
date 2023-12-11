import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EditMatchForm = ({ matchId, existingMatchData, onSave }) => {
  const [matchData, setMatchData] = useState({
    homeTeam: "",
    awayTeam: "",
    venue: "",
    dateTime: "",
    mainReferee: "",
    linesmen: {
      linesman1: "",
      linesman2: "",
    },
  });

  const [errors, setErrors] = useState({});

  const teams = ["Team1", "Team2",];
  const stadiums = ["Stadium1", "Stadium2", ];

  useEffect(() => {
   
    if (existingMatchData) {
      setMatchData(existingMatchData);
    }
  }, [existingMatchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    
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

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Call the onSave prop to handle saving the edited match data
      onSave(matchId, matchData);
    }
  };

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
                                    value={matchData.homeTeam}
                                    onChange={handleChange}
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
                                    value={matchData.awayTeam}
                                    onChange={handleChange}
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
                                    value={matchData.dateTime}
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
                                    value={matchData.mainReferee}
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
                                    value={matchData.linesmen.linesman1}
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
                                    value={matchData.linesmen.linesman2}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
            <button type="submit" className="btn btn-primary btn-lg float-right">
              Save Changes
            </button>
            <Link to="/matches" className="btn btn-secondary btn-lg float-right mr-2">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMatchForm;
