import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "../styles/SignUp.css";


export default function EditUserForm({ user }) {
    const initialUserData = user ? { ...user } : {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        gender: "Male",
        city: "",
        address: ""
    };

    const [userData, setUserData] = useState(initialUserData);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await validateForm();
        if (result) {
            console.log("hello")
            try {
                var options = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                    },
                    body: JSON.stringify(userData)
                }
                var response = await fetch("http://localhost:3000/user/update-details", options);
                if (response.ok) {
                    const { updatedUser } = await response.json();
                    const event = new Event("profileUpdated");
                    toast.success(`Profile edited successfully!`, {
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
                    event.username = updatedUser.username;
                    localStorage.setItem("username", updatedUser.username);
                    window.dispatchEvent(event);
                    if (localStorage.getItem("role") === "Manager") {
                        navigate("/manager");
                    }
                    else if (localStorage.getItem("role") === "Fan") {
                        navigate("/");
                    }
                }
                else {
                    toast.error(`Edit failed! Please Try again!`, {
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
            catch (error) {
                toast.error(`Edit failed! Please Try again!`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                console.log(error)
            }
        }
    }
    const checkUsernameAvailability = async () => {
        try {
            var options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
            const response = await fetch(`http://localhost:3000/user/check-username-availability/${userData.username}`, options);
            if (response.ok) {
                const data = await response.json();
                return !data.available; // Return true if the username is taken
            } else {
                console.error("Failed to check username availability");
                return true; // Assume username is taken if the request fails
            }
        } catch (error) {
            console.error("Error checking username availability:", error);
            return true; // Assume username is taken if there is an error
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ""
        });
    }
    useEffect(() => {
        setUserData(user ? { ...user } : initialUserData);
    }, [user]);


    const validateForm = async () => {
        let isValid = true;
        const newErrors = {};

        for (const key in userData) {
            if (userData[key] === "") {
                newErrors[key] = "This field is required";
                isValid = false;
            } else {
                // Clear the error if the field is not empty
                newErrors[key] = "";
            }
        }

        setErrors(newErrors);
        return isValid;
    };


    return (
        <div className="col mt-3 mb-3 ml-5 mr-5">
            <div className="card rounded-2">
                <div className="card-header text-center">
                    <div className="h3 mb-0">Edit Profile</div>
                </div>
                <div className="card-body">
                    <form
                        action=""
                        className="form needs-validation"
                        role="form"
                        autoComplete="off"
                        id="formLogin"
                        method="POST"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-row">
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="fname">First Name</label>
                                <input
                                    type="text"
                                    className="form-control form-control-md rounded-0"
                                    name="first_name"
                                    id="fname"
                                    required=""
                                    placeholder="John"
                                    value={userData.first_name}
                                    onChange={handleChange}
                                />
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                                <div className="invalid-feedback">
                                    Please enter first name.
                                </div>
                            </div>
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="lname">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control form-control-md rounded-0"
                                    name="last_name"
                                    id="lname"
                                    required=""
                                    placeholder="Doe"
                                    value={userData.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {(errors["first_name"] || errors["last_name"]) && <div className="form-row">
                            <div className="col-md-6 mb-1">
                                {errors["first_name"] !== "" && <div className="text-danger">First Name is Required</div>}
                            </div>
                            <div className="col-md-6">
                                {errors["last_name"] !== "" && <div className="text-danger">Last Name is Required</div>}
                            </div>
                        </div>}
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="gender">Gender</label>
                                <div className="d-flex justify-content-between align-items-center">
                                    <label className="flex-fill mr-3">
                                        <input type="radio" name="gender" value="Male" checked={userData.gender === 'Male'} onChange={handleChange} />
                                        <span className="ml-2">Male</span>
                                    </label>
                                    <label className="flex-fill">
                                        <input type="radio" name="gender" value="Female" checked={userData.gender === 'Female'} onChange={handleChange} />
                                        <span className="ml-2">Female</span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="bday">Birth Date</label>
                                <input
                                    type="date"
                                    className="form-control form-control-md rounded-0"
                                    name="birth_date"
                                    id="bday"
                                    required=""
                                    value={userData.birth_date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {(errors["gender"] || errors["birth_date"]) && <div className="form-row">
                            <div className="col-md-6 mb-1">
                                {errors["gender"] !== "" && <div className="text-danger"> Pick a gender</div>}
                            </div>
                            <div className="col-md-6">
                                {errors["birth_date"] !== "" && <div className="text-danger"> Provide a birth date</div>}
                            </div>
                        </div>}

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    className="form-control form-control-md rounded-0"
                                    name="city"
                                    id="city"
                                    required=""
                                    placeholder="Cairo"
                                    value={userData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    className="form-control form-control-md rounded-0"
                                    name="address"
                                    id="address"
                                    required=""
                                    placeholder="Appartment, studio, or floor"
                                    value={userData.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {(errors["city"] || errors["address"]) && <div className="form-row">
                            <div className="col-md-6 mb-1">
                                {errors["city"] !== "" && <div className="text-danger"> City is required</div>}
                            </div>
                            <div className="col-md-6">
                                {errors["address"] !== "" && <div className="text-danger"> Address is required</div>}
                            </div>
                        </div>}
                        <button
                            type="submit"
                            className="btn btn-danger btn-lg float-right"
                            id="btnSignup"
                        >
                            Edit Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
