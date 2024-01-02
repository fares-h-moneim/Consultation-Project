import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MascotImage from "../MascotImage"
import AddStadiumForm from './AddStadiumComponent'

export default function AddingStadium() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("role") !== "Manager") {
            navigate("/signin");
            toast.error(`⚽ Please sign in as a manager!`, {
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
            return;
        }
    }, []);
    return (
        <div className="container-fluid px-0 content" style={{ height: "92vh", overflow: "hidden" }}>
            <div className="row align-items-center">
                <MascotImage />
                <AddStadiumForm></AddStadiumForm>
            </div>
        </div>
    );
}