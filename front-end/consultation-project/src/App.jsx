import { useState } from "react";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import "./styles/App.css"
import SignupPage from "./components/SignUpPage";

export default function App() {
    const [index, setIndex] = useState("home");
    const onPageClick = (index) => {
        console.log(index);
        setIndex(index);
    }
    return (
        <div className="App container">
            <NavBar onClick={onPageClick} />
            {index === "home" && <LandingPage />}
            {index === "signup" && <SignupPage />}
        </div>
    );
}