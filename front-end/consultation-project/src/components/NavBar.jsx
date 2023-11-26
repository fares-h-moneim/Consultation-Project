import { useState } from "react";
import Button from "./NavButton";
import "../styles/NavBar.css";
import EFALogo from "../assets/EFA.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-black">
      <Link className="navbar-brand" to="/">
        <img
          src={EFALogo}
          width={50}
          className="rounded float-start ml-2"
          alt="EFA Logo"
        />
      </Link>
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
            <Link to="/matches">
              <Button text="MATCHES" />
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/bookings">
              <Button text="BOOKINGS" />
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/signup">
              <Button text="SIGN UP" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signin">
              <Button text="SIGN IN" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
