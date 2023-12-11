import MascotImage from "../MascotImage"
import AddStadiumForm from './AddStadiumComponent'

export default function AddingStadium() {
    return (
        <div className="container-fluid px-0 content" style={{ backgroundColor: "red", height: "92vh" }}>
            <div className="row align-items-center">
                <MascotImage />
                <AddStadiumForm></AddStadiumForm>
            </div>
        </div>
    );
}