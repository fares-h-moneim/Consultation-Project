import { useState } from "react";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import "./styles/App.css"
import SignupPage from "./components/SignUpPage";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./components/SignInPage";

export default function App() {
    const [index, setIndex] = useState("home");
    const onPageClick = (index) => {
        console.log(index);
        setIndex(index);
    }



    return (
        <>
            <NavBar />
            <div className="App container">
                <Routes>
                    <Route path="/" element={<LandingPage />}></Route>
                    <Route path="/signup" element={<SignupPage />}></Route>
                    <Route path="/signin" element={<SignInPage />}></Route>
                </Routes>
            </div>
        </>
    );
}