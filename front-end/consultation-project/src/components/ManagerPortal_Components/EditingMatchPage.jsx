import MascotImage from "../MascotImage"
import EditMatchForm from "./editingMatchComponent"

export default function EditingMatch() {
    return (
        <div className="container-fluid px-0 content" style={{ backgroundColor: "red", height: "92vh" }}>
            <div className="row align-items-center">
                <MascotImage />
                <EditMatchForm></EditMatchForm>
            </div>
        </div>
    );
}