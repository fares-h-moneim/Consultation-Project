import { useState } from "react";
import { Link } from "react-router-dom";

export default async function SignIn() {
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });

    void CallEndPoint(userData)
    {
        e.preventDefault();
        if (validateForm()) {
            try {
                var options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(userData)
                }
                var response = await fetch("http://localhost:3000/signin", options);
                if (response.ok) {
                    console.log("sign In success");
                    navigate("/");
                }
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value

        });
        CallEndPoint(userData);
    }

    return (
        <div className="col mt-3 mb-3 ml-5 mr-5">
            <div className="card rounded-2">
                <div className="card-header text-center">
                    <div className="h3 mb-0">Sign In</div>
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
