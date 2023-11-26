import React from "react";
import stadium from "../assets/stadium.svg";
import calendar from "../assets/calendar.svg";
import Match from "./MatchComponent";

export default function MatchesList() {
    const matchElements = [];

    //async function GetMatches() {
       // const post = await fetch("/get-matches").then((res) => res.json());
        for (let index = 0; index < 7; index++) {
            matchElements.push(
              <div className="d-flex align-items-center justify-content-center m-4">
             <Match></Match>
             </div>
            );
          }
      //}

     // GetMatches();
  return (
    <div className="container-fluid px-0 content align-items-center justify-content-center" style={{ backgroundColor: "red" }}>
       {matchElements}
   </div>
  );
}
