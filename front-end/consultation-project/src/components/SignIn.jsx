import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });

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
                                <label htmlFor="fname">Username</label>
                                <input
                                    type="text"
                                    className="form-control form-control-md rounded-0"
                                    name="userName"
                                    id="uname"
                                    required=""
                                    placeholder="John"
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
