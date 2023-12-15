import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SignUp.css";

export default function ChangePass() {
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords({
            ...passwords,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = validateForm();
        if (result) {
            try {
                const token = localStorage.getItem("jwtToken");
                const data = {
                    oldPassword: passwords.oldPassword,
                    newPassword: passwords.newPassword,
                };
                fetch("http://localhost:3000/user/change-password", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => {
                        if (response.ok) {
                            alert("Password changed successfully!");
                        } else {
                            alert("Failed to change password");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            catch (error) {
                console.error(error);
            }
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        for (const key in passwords) {
            if (passwords[key] === "") {
                newErrors[key] = "This field is required";
                isValid = false;
            } else {
                // Clear the error if the field is not empty
                newErrors[key] = "";
            }
        }

        if (passwords.newPassword !== passwords.repeatNewPassword) {
            newErrors.repeatNewPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    return (
        <div className="col mt-3 mb-3 ml-5 mr-5">
            <div className="card rounded-2">
                <div className="card-header text-center">
                    <div className="h3 mb-0">Change Password</div>
                </div>
                <div className="card-body">
                    <form
                        className="form needs-validation"
                        role="form"
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-row">
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="oldPassword">Old Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-md rounded-0"
                                    name="oldPassword"
                                    id="oldPassword"
                                    required
                                    value={passwords.oldPassword}
                                    onChange={handleChange}
                                />
                                {errors.oldPassword && (
                                    <div className="text-danger">{errors.oldPassword}</div>
                                )}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-md rounded-0"
                                    name="newPassword"
                                    id="newPassword"
                                    required
                                    value={passwords.newPassword}
                                    onChange={handleChange}
                                />
                                {errors.newPassword && (
                                    <div className="text-danger">{errors.newPassword}</div>
                                )}
                            </div>
                            <div className="form-group col-md-6 mb-0">
                                <label htmlFor="repeatNewPassword">Repeat New Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-md rounded-0"
                                    name="repeatNewPassword"
                                    id="repeatNewPassword"
                                    required
                                    value={passwords.repeatNewPassword}
                                    onChange={handleChange}
                                />
                                {errors.repeatNewPassword && (
                                    <div className="text-danger">{errors.repeatNewPassword}</div>
                                )}
                            </div>
                        </div>
                        <div className="form-row">
                            <button
                                type="submit"
                                className="btn btn-danger btn-lg float-right col"
                                id="btnChangePass"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
