import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: "",
        city: "",
        address: "",
        role: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            var response = await fetch("http://localhost:3000/add-request", userData);
            if (response.ok) {
                console.log("sign up success")
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="col mt-3 mb-3 ml-5 mr-5">
            <div className="card rounded-2">
                <div className="card-header text-center">
                    <div className="h3 mb-0">Sign Up</div>
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
                    >
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="fname">First Name</label>
                                <input
                                    type="text"
                                    className="form-control form-control-md rounded-0"
                                    name="firstName"
                                    id="fname"
                                    required=""
                                    placeholder="John"
                                    value={userData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lname">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control form-control-md rounded-0"
                                    name="lastName"
                                    id="lname"
                                    required=""
                                    placeholder="Doe"
                                    value={userData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

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

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="gender">Gender</label>
                                <div className="d-flex justify-content-between align-items-center">
                                    <label className="flex-fill mr-3">
                                        <input type="radio" name="gender" value="Male" />
                                        <span className="ml-2">Male</span>
                                    </label>
                                    <label className="flex-fill">
                                        <input type="radio" name="gender" value="Female" />
                                        <span className="ml-2">Female</span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="bday">Birth Date</label>
                                <input
                                    type="date"
                                    className="form-control form-control-md rounded-0"
                                    name="birthDate"
                                    id="bday"
                                    required=""
                                    value={userData.birthDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

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
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="role">Role</label>
                                <div className="d-flex justify-content-between align-items-center">
                                    <label className="flex-fill mr-3">
                                        <input type="radio" name="role" value="Manager" />
                                        <span className="ml-2">Manager</span>
                                    </label>
                                    <label className="flex-fill">
                                        <input type="radio" name="role" value="Fan" />
                                        <span className="ml-2">Fan</span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group col-md-6 mt-4">
                                <Link to="/signin"><p>Already have an account? Sign in instead.</p></Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-danger btn-lg float-right"
                            id="btnSignup"
                            onSubmit={handleSubmit}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
