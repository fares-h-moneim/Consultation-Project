import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const navigate = useNavigate();
    const callEndPoint = async (e) => {
        e.preventDefault();
        try {
            if (validateForm()) {
                var options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(userData)
                }
                var response = await fetch("http://localhost:3000/user/sign-in", options);
                if (response.ok) {
                    var responseData = await response.json();
                    var jwtToken = responseData.token;
                    var username = responseData.username;
                    var role = responseData.role;
                    localStorage.setItem("jwtToken", jwtToken);
                    localStorage.setItem("username", username);
                    localStorage.setItem("role", role)
                    setInvalidCredentials(false);
                    window.dispatchEvent(new Event("login"));

                    if (role === "Fan" || role === "Manager") {
                        navigate("/");
                    }
                    else if(role === "admin") {
                        navigate("/admin");
                    }
                }
                else {
                    if (response.status === 401) {
                        setInvalidCredentials(true);
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
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

    return (
        <div className="col mt-3 mb-3 ml-5 mr-5">
            <div className="card rounded-2">
                <div className="card-header text-center">
                    <div className="h3 mb-0">Sign In</div>
                </div>
                {invalidCredentials &&
                    <div class="d-flex justify-content-center alert alert-danger" role="alert">
                        Invalid Credentials
                    </div>}
                <div className="card-body">
                    <form
                        action=""
                        className="form"
                        role="form"
                        autoComplete="off"
                        id="formLogin"
                        noValidate=""
                        method="POST"
                        onSubmit={callEndPoint}
                    >
                        <div className="form-row">
                            <div className="form-group col">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control form-control-md rounded-0"
                                    name="username"
                                    id="username"
                                    required=""
                                    placeholder="John"
                                    value={userData.username}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {(errors["username"]) && <div className="form-row">
                            <div className="col-md-6 mb-1">
                                {errors["username"] !== "" && <div className="text-danger"> Username is Required</div>}
                            </div>
                        </div>}
                        <div className="form-row">
                            <div className="form-group col">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-md rounded-0"
                                    name="password"
                                    id="password"
                                    required=""
                                    placeholder="Doe"
                                    value={userData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {(errors["password"]) && <div className="form-row">
                            <div className="col-md-6 mb-1">
                                {errors["password"] !== "" && <div className="text-danger"> Password is Required</div>}
                            </div>
                        </div>}
                        <div className="form-row">
                            <div className="form-group col">
                                <Link to="/signup"><p>Don't have an account? Sign up instead</p></Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-danger btn-lg float-right"
                            id="btnSignin"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
