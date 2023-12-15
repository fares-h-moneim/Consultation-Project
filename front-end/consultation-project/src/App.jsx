import { useState } from "react";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import "./styles/App.css"
import SignupPage from "./components/SignUpPage";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import MatchesList from "./components/MatchesPage";
import EditUser from "./components/EditUser";
import Booking from "./components/Booking";
import AdminPortal from "./components/AdminPortal";
import ManagerPortal from "./components/ManagerPortal";
import AddingMatch from './components/ManagerPortal_Components/AddMatchPage'
import MatchesListForManager from './components/ManagerPortal_Components/ViewMatchPage'
import EditingMatch from './components/ManagerPortal_Components/EditingMatchPage'
import AddingStadium from './components/ManagerPortal_Components/AddStadiumPage'
import ViewUserRequests from "./components/ViewUserRequests";
import ViewUsers from "./components/ViewUsers";
import BookingsPage from "./components/BookingsPage";
import Payment from "./components/PaymentPage";


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
                    <Route path="/matches" element={<MatchesList />}></Route>
                    <Route path="/edit-profile" element={<EditUser />}></Route>
                    <Route path="/booking/:matchId" element={<Booking />}></Route>
                    <Route path="/admin" element={<AdminPortal />}></Route>
                    <Route path="/manager" element={<ManagerPortal />}></Route>
                    <Route path="/add-match" element={<AddingMatch />}></Route>
                    <Route path="/edit-match/:matchId" element={<EditingMatch />} />
                    <Route path="/view-matches" element={<MatchesListForManager />}></Route>
                    <Route path="/add-stadium" element={<AddingStadium />}></Route>
                    <Route path="/view-requests" element={<ViewUserRequests />}></Route>
                    <Route path="/view-users" element={<ViewUsers />}></Route>
                    <Route path="/bookings" element={<BookingsPage />}></Route>
                    <Route path="/payment/:matchId" element={<Payment />}></Route>
                </Routes>
            </div>
        </>
    );
}