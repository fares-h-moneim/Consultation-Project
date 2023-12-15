import React, { useState, useEffect } from 'react';
import MatchComponent from './Match_Component'

export default function MatchesListForManager() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function getMatches() {
      var options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
      var response = await fetch("http://localhost:3000/match/get-matches", options);
      var data = await response.json();
      setMatches(data);
    }

    getMatches();
  }, []);

  return (
    <div className="container-fluid px-0 content align-items-center justify-content-center" style={{ height: "100%" }} >
      {
        matches.map((match, index) => (
          <div key={index} className="d-flex align-items-center justify-content-center m-4">
            <MatchComponent matchDetails={match} />
          </div>
        ))
      }
    </ div>
  );
}