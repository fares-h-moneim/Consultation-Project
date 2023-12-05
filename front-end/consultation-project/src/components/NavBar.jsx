import { useState, useEffect } from "react";
import Button from "./NavButton";
import "../styles/NavBar.css";
import EFALogo from "../assets/EFA.png";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  // You need to implement a function or use an authentication context to check if the user is authenticated
  const checkAuthentication = () => {
    // Your logic to check authentication status (e.g., checking localStorage, a context, etc.)
    const token = localStorage.getItem("jwtToken");
    console.log(token);
    setIsAuthenticated(!!token);
  };
  const logout = async () => {
      try {
        // Make a request to the server's logout endpoint
        const response = await fetch("http://localhost:3000/user/log-out", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });

        if (response.ok) {
          // Remove the token from localStorage
          localStorage.removeItem("jwtToken");
          // Update the isAuthenticated state
          setIsAuthenticated(false);
          // Redirect to the home page or any other desired location
          navigate("/");
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error(error);
      }
    };


  useEffect(() => {
    // Check authentication status when the component mounts
    checkAuthentication();
  }, []);

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
                <button text="LOGOUT" onClick={logout}/>
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
      </div>
    </nav>
  );
}
