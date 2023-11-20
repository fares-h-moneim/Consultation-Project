import { useState } from "react";

export default function Signup() {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: "",
        city: "",
        address: "",
        role: ""
    });

    return (
        <div className="col mr-5">
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
                                    name="fname"
                                    id="fname"
                                    required=""
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lname">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control form-control-md rounded-0"
                                    name="lname"
                                    id="lname"
                                    required=""
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="uname">Username</label>
                                <input
                                    type="text"
                                    className="form-control form-control-md rounded-0"
                                    name="uname"
                                    id="uname"
                                    required=""
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
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="gender">Gender</label>
                                <div className="d-flex justify-content-between align-items-center">
                                    <label className="flex-fill mr-3">
                                        <input type="radio" name="gender" value="male" />
                                        <span className="ml-2">Male</span>
                                    </label>
                                    <label className="flex-fill">
                                        <input type="radio" name="gender" value="female" />
                                        <span className="ml-2">Female</span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="bday">Birth Date</label>
                                <input
                                    type="date"
                                    className="form-control form-control-md rounded-0"
                                    name="bday"
                                    id="bday"
                                    required=""
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
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-danger btn-lg float-right"
                            id="btnSignup"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
