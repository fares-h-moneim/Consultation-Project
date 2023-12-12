import MascotImage from "../MascotImage"
import AddMatchForm from "./AddMatchComponent";

export default function AddingMatch() {
    return (
        <div className="container-fluid px-0 content" style={{ backgroundColor: "red", height: "92vh" }}>
            <div className="row align-items-center">
                <MascotImage />
                <AddMatchForm></AddMatchForm>
            </div>
        </div>
    );
}