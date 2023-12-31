import { useState } from "react";
import { toast } from 'react-toastify';

//TODO: Enhance UI

export default function UserRequest({ user, key }) {
    const [isRemoved, setIsRemoved] = useState(false);
    function dateFormat(dateString) {
        const originalDate = new Date(dateString);

        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };

        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(originalDate);
        return formattedDate;
    }

    const accept = async (e) => {
        e.preventDefault();
        try {
            var options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify({ id: user._id }) // pass id in the body
            }
            console.log(`Bearer ${localStorage.getItem("jwtToken")}`);
            var response = await fetch(`https://epl-reservation-backend.vercel.app/request/approve-request`, options);
            if (response.ok) {
                toast.success(`${user.username} Accepted!`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                setIsRemoved(true);
            }
            else {
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
            console.log(error)
        }
    }

    const reject = async (e) => {
        e.preventDefault();
        try {
            var options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify({ id: user._id })
            }
            console.log(`Bearer ${localStorage.getItem("jwtToken")}`);
            var response = await fetch(`https://epl-reservation-backend.vercel.app/request/decline-request`, options);
            if (response.ok) {
                toast.success(`${user.username} Rejected!`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                setIsRemoved(true);
            }
            else {
                toast.error(`Rejection failed! Please Try again!`, {
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
            toast.error(`Rejection failed! Please Try again!`, {
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


    if (isRemoved) {
        return null;
    }

    return (
        <div className="col py-3" style={{ height: "9vh", width: "80vw" }}>
            <div className="row g-0 align-items-center justify-content-top p-0" style={{ backgroundColor: "white" }}>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <h5 style={{ marginLeft: "10px" }}> {user.username} &nbsp;</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <h5 style={{ marginLeft: "10px" }}>{user.email}</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <div className="d-flex align-items-center justify-content-center">
                        <h5 style={{ marginLeft: "10px" }}>{user.first_name + " " + user.last_name}</h5>
                    </div>
                </div>
                <div className="col text-center">
                    <button type="button" className="btn btn-success" style={{ margin: "10px 10px" }} onClick={accept}>Accept</button>
                </div>
                <div className="col text-center">
                    <button type="button" className="btn btn-danger" style={{ margin: "10px 10px" }} onClick={reject}>Reject</button>
                </div>
            </div>
            <div className="row g-0" style={{ backgroundColor: "grey" }}>
                <div className="col">
                    <p className="p-0 mx-5 my-1" style={{ fontFamily: "Arial, sans-serif", fontSize: "20px", color: "#fff" }}>
                        {dateFormat(user.birth_date)}
                    </p>
                </div>
                <div className="col">
                    <p className="p-0 my-1" style={{ fontFamily: "Arial, sans-serif", fontSize: "20px", color: "#fff" }}>
                        {user.gender}
                    </p>
                </div>
                <div className="col">
                    <p className="p-0 my-1" style={{ fontFamily: "Arial, sans-serif", fontSize: "20px", color: "#fff" }}>
                        {user.role}
                    </p>
                </div>
            </div>
        </div>
    );
}