import { useState, useEffect } from "react";
import Button from "./NavButton";
import "../styles/NavBar.css";
import EFALogo from "../assets/EFA.png";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const checkAuthentication = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setUsername(localStorage.getItem("username"));
      setIsAuthenticated(true);
    } else {
      setUsername("");
      setIsAuthenticated(false);
    }
  };
  const logout = async () => {
    try {
      const response = await fetch("https://epl-reservation-backend.vercel.app/user/log-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        setIsAuthenticated(false);
        console.log("Logout success");
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuthentication();

    const handleLogin = () => {
      checkAuthentication();
    };
    const handleProfileUpdated = (event) => {
      setUsername(event.username);
      console.log(username)
    }

    window.addEventListener("login", handleLogin);
    window.addEventListener("profileUpdated", handleProfileUpdated);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("login", handleLogin);
      window.removeEventListener("profileUpdated", handleProfileUpdated);
    };
  }, []); // Only run on mount

  useEffect(() => {
    // Check authentication status when the component mounts
    checkAuthentication();
  }, [isAuthenticated, username]);

  return (
    <nav className="navbar navbar-expand-lg bg-black">
      <Link className="navbar-brand" to={localStorage.getItem("role") === "Manager" ? "/manager" : (localStorage.getItem("role") === "Admin" ? "/admin" : "/")}>
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
            {localStorage.getItem("role") === "Manager" ?
              <Link to="/view-matches">
                <Button text="MATCHES" />
              </Link> :
              <Link to="/matches">
                <Button text="MATCHES" />
              </Link>
            }
          </li>
          <li className="nav-item">
            {isAuthenticated && localStorage.getItem("role") === "Fan" && (
              <Link to="/bookings">
                <Button text="BOOKINGS" />
              </Link>
            )}
          </li>
        </ul>
        {isAuthenticated ? (
          <div className="ml-auto mr-3">
            {(localStorage.getItem("role") === "Fan" || localStorage.getItem("role") === "Manager") &&
              <Link to="/edit-profile">
                <Button text={`${username}`} />
              </Link>
            }
            <Link to="/">
              <Button text="LOGOUT" onClick={logout} />
            </Link>
          </div>
        ) :
          <div className="ml-auto mr-3">
            <Link to="/signin">
              <Button text="SIGN IN" />
            </Link>
            <Link to="/signup">
              <Button text="SIGN UP" />
            </Link>
          </div>}
      </div>

    </nav>
  );
}
