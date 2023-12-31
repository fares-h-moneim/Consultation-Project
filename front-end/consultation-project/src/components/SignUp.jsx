import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import { toast } from 'react-toastify';

export default function Signup({ user, text = "Sign Up" }) {
    const initialUserData = user ? { ...user } : {
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        gender: "Male",
        city: "",
        address: "",
        role: "Manager"
    };

    const [userData, setUserData] = useState(initialUserData);
    const [confPass, setConfPass] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await validateForm();
        if (result) {
            try {
                var options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(userData)
                }
                var response = await fetch("https://epl-reservation-backend.vercel.app/request/add-request", options);
                if (response.ok) {
                    toast.success(`👋 Request sent! Approval Pending.`, {
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
                    console.log("sign up success");
                    navigate("/");
                }
                else {
                    toast.error(`Request Failed! Try again!`, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light"
                    });
                }
            }
            catch (error) {
                toast.error(`Request Failed! Try again!`, {
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
            const response = await fetch(`https://epl-reservation-backend.vercel.app/user/check-username-availability/${userData.username}`, options);
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

        if (name === "confPass") {
            setConfPass(value);
        } else {
            setUserData({
                ...userData,
                [name]: value
            });
        }

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

        // Validate each field
        for (const key in userData) {
            if (userData[key] === "") {
                newErrors[key] = "This field is required";
                isValid = false;
            } else {
                // Clear the error if the field is not empty
                newErrors[key] = "";
            }
        }
        // Validate password confirmation
        if (confPass === "") {
            newErrors.confPass = "Confirm Password is required";
            isValid = false;
        } else if (userData.password !== confPass) {
            newErrors.confPass = "Passwords do not match";
            isValid = false;
        } else {
            newErrors.confPass = "";
        }
        if (userData.username !== "") {
            const usernameTaken = await checkUsernameAvailability();
            const sameUsername = userData.username === localStorage.getItem("username");
            if (usernameTaken && !sameUsername) {
                newErrors["username_taken"] = "This username is already taken";
                isValid = false;
            } else {
                newErrors["username_taken"] = "";
            }
        }
        else {
            newErrors["username_taken"] = "";
        }

        setErrors(newErrors);
        return isValid;
    };



    return (
        <div className="col mt-3 mb-3 ml-5 mr-5">
            <div className="card rounded-2">
                <div className="card-header text-center">
                    <div className="h3 mb-0">{text}</div>
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
                                <label htmlFor="uname">Username</label>
                                <input
                                    type="text"
                                    className="form-control form-control-md rounded-0"
                                    name="username"
                                    id="uname"
                                    required=""
                                    placeholder="johndoe"
                                    value={userData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control form-control-md rounded-0"
                                    name="email"
                                    id="email"
                                    required=""
                                    placeholder="example@email.com"
                                    value={userData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {(errors["username"] || errors["email"] || errors["username_taken"]) && <div className="form-row">
                            <div className="col-md-6 mb-1">
                                {errors["username"] !== "" && <div className="text-danger"> Username is Required</div>}
                                {errors["username_taken"] !== "" && <div className="text-danger"> Username is already taken</div>}
                            </div>
                            <div className="col-md-6">
                                {errors["email"] !== "" && <div className="text-danger"> Provide a valid email</div>}
                            </div>
                        </div>}
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-md rounded-0"
                                    name="password"
                                    id="password"
                                    required=""
                                    value={userData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="confPass">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-md rounded-0"
                                    name="confPass"
                                    id="confPass"
                                    required=""
                                    value={userData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {(errors["confPass"] || errors["password"]) && <div className="form-row">
                            <div className="col-md-6 mb-1">
                                {errors["password"] !== "" && <div className="text-danger"> Password is Required</div>}
                            </div>
                            <div className="col-md-6">
                                {errors["confPass"] !== "" && <div className="text-danger"> {errors.confPass} </div>}
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
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="role">Role</label>
                                <div className="d-flex justify-content-between align-items-center">
                                    <label className="flex-fill mr-3">
                                        <input type="radio" name="role" value="Manager" checked={userData.role === 'Manager'} onChange={handleChange} />
                                        <span className="ml-2">Manager</span>
                                    </label>
                                    <label className="flex-fill">
                                        <input type="radio" name="role" value="Fan" checked={userData.role === 'Fan'} onChange={handleChange} />
                                        <span className="ml-2">Fan</span>
                                    </label>
                                </div>
                            </div>
                            {text == "Sign Up" && <div className="form-group col-md-6 mt-4">
                                <Link to="/signin"><p>Already have an account? Sign in instead.</p></Link>
                            </div>}
                        </div>
                        {(errors["role"]) && <div className="form-row">
                            <div className="col-md-6 mb-1">
                                {errors["role"] !== "" && <div className="text-danger"> Choose a role</div>}
                            </div>
                        </div>}
                        <button
                            type="submit"
                            className="btn btn-danger btn-lg float-right"
                            id="btnSignup"
                        >
                            {text}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
