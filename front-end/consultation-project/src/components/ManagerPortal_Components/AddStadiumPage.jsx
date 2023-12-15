import MascotImage from "../MascotImage"
import AddStadiumForm from './AddStadiumComponent'

export default function AddingStadium() {
    return (
        <div className="container-fluid px-0 content" style={{ height: "92vh", overflow: "hidden" }}>
            <div className="row align-items-center">
                <MascotImage />
                <AddStadiumForm></AddStadiumForm>
            </div>
        </div>
    );
}