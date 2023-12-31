import React, { useState, useEffect } from 'react';
import Match from "./MatchComponent";

export default function MatchesList() {
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
      var response = await fetch("https://epl-reservation-backend.vercel.app//match/get-matches", options);
      var data = await response.json();
      setMatches(data);
      console.log(data);
    }

    getMatches();
  }, []);

  return (
    <div className="container-fluid px-0 content align-items-center justify-content-center" style={{ height: "100%" }}>
      {matches.map((match, index) => (
        <div key={index} className="d-flex align-items-center justify-content-center m-4">
          <Match matchDetails={match} />
        </div>
      ))}
    </div>
  );
}