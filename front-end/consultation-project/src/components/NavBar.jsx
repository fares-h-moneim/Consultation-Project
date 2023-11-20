import { useState } from "react";
import Button from "./NavButton";
import "../styles/NavBar.css";
import EFALogo from "../assets/EFA.png";

export default function NavBar({ onClick }) {
  return (
    <nav className="navbar navbar-expand-lg bg-black">
      <a className="navbar-brand" href="/" onClick={() => onClick("home")}>
        <img
          src={EFALogo}
          width={50}
          className="rounded float-start ml-2"
          alt="EFA Logo"
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Button text="MATCHES" onClick={() => onClick("matches")} />
          </li>
          <li className="nav-item">
            <Button text="BOOKINGS" onClick={() => onClick("bookings")} />
          </li>
          <li className="nav-item">
            <Button text="SIGN UP" onClick={() => onClick("signup")} />
          </li>
          <li className="nav-item">
            <Button text="SIGN IN" onClick={() => onClick("signin")} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
