import MascotImage from "./MascotImage";
import SignUp from "./SignUp";

export default function EditUser() {

    return (
        <div className="container-fluid px-0 content" style={{ backgroundColor: "red", height: "auto" }}>
            <div className="row align-items-center">
                <MascotImage />
                <SignUp text="Edit Profile``" />
            </div>
        </div>
    );
}