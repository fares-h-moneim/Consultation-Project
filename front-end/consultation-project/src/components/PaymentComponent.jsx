import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Payment(checkout) {
    const {matchId} = useParams();
    const [userData, setUserData] = useState({
        cardNumber: "",
        pinNumber: ""
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [checkoutData, setCheckoutData] = useState(checkout);
    const callEndpoint = async (e) => {
        e.preventDefault();
        try {
            if (validateForm()) {
                console.log(checkoutData);
                const userData = {
                    match_id: matchId,
                    reserved_seats: checkoutData
                }
                var options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                    },
                    body: JSON.stringify(userData)
                };
                var response = await fetch("https://epl-reservation-backend.vercel.app//booking/book-match", options);
                if(response.ok){
                    toast.success(`👋 Match booked successfully!`, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        icon: false
                    });
                    navigate("/bookings");
                }
                else{
                    toast.error(`Match booking failed! Please Try again!`, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    });
                    console.log("error");
                }
            }
        }
        catch (error) {
            toast.error(`Approval failed! Please Try again!`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            console.log(error);
        }
    }
    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validate each field
        for (const key in userData) {
            if (userData[key] === "") {
                newErrors[key] = "This field is required";
                isValid = false;
            }
        }
        setErrors(newErrors);
        return isValid;
    }
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value

        });
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    }

    return (
        <div className="col mt-3 mb-3 ml-5 mr-5">
            <div className="card rounded-2">
                <div className="card-header text-center">
                    <div className="h3 mb-0">Pay Now</div>
                </div>
                <div className="card-body">
                    <form
                        action=""
                        className="form"
                        role="form"
                        autoComplete="off"
                        id="formLogin"
                        noValidate=""
                        method="POST"
                        onSubmit={callEndpoint}
                    >
                        <div className="form-row">
                            <div className="form-group col">
                                <label htmlFor="username">Credit Card Number</label>
                                <input
                                    type="text"
                                    className="form-control form-control-md rounded-0"
                                    name="cardNumber"
                                    id="cardNumber"
                                    required=""
                                    placeholder="Credit Card Number"
                                    value={userData.cardNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {(errors["cardNumber"]) && <div className="form-row">
                            <div className="col-md-6 mb-1">
                                {errors["cardNumber"] !== "" && <div className="text-danger"> Credit Card Number is required</div>}
                            </div>
                        </div>}
                        <div className="form-row">
                            <div className="form-group col">
                                <label htmlFor="password">Pin Number</label>
                                <input
                                    type="password"
                                    className="form-control form-control-md rounded-0"
                                    name="pinNumber"
                                    id="pinNumber"
                                    required=""
                                    placeholder="Pin Number"
                                    onChange={handleChange}
                                    value={userData.pinNumber}
                                />
                            </div>
                        </div>
                        {(errors["pinNumber"]) && <div className="form-row">
                            <div className="col-md-6 mb-1">
                                {errors["pinNumber"] !== "" && <div className="text-danger"> Pin Number is required</div>}
                            </div>
                        </div>}
                        <button
                            type="submit"
                            className="btn btn-danger btn-lg float-right"
                            id="btnSignin"
                        >
                            Pay Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
