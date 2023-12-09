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
      const response = await fetch("http://localhost:3000/user/log-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem("jwtToken");
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

    window.addEventListener("login", handleLogin);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("login", handleLogin);
    };
  }, []); // Only run on mount

  useEffect(() => {
    // Check authentication status when the component mounts
    checkAuthentication();
  }, [isAuthenticated]);

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
          <li className="nav-item">
            {/* Conditionally render "BOOKINGS" based on authentication */}
            {isAuthenticated && (
              <Link to="/bookings">
                <Button text="BOOKINGS" />
              </Link>
            )}
          </li>
          <li className="nav-item">
            {/* Conditionally render "SIGN UP" or "LOGOUT" based on authentication */}
            {isAuthenticated ? (
              <Link to="/">
                <Button text="LOGOUT" onClick={logout} />
              </Link>
            ) : (
              <Link to="/signup">
                <Button text="SIGN UP" />
              </Link>
            )}
          </li>
          <li className="nav-item">
            {/* Conditionally render "SIGN IN" or "LOGOUT" based on authentication */}
            {isAuthenticated ? (
              <></>
            ) : (
              <Link to="/signin">
                <Button text="SIGN IN" />
              </Link>
            )}
          </li>
        </ul>
        {isAuthenticated && (
          <div className="ml-auto mr-3">
            <Link to="/edit-profile">
              <Button text={`${username}`} />
            </Link>
          </div>
        )}
      </div>

    </nav>
  );
}
