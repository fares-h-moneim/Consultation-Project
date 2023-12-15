import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Payment() {
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
                                />
                            </div>
                        </div>
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
                                />
                            </div>
                        </div>

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
