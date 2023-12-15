import MascotImage from "./MascotImage";
import SignUp from "./SignUp";

export default function SignUpPage() {
    return (
        <div className="container-fluid px-0 content" style={{ height: "92vh", overflow: "hidden" }}>
            <div className="row align-items-center">
                <MascotImage />
                <SignUp />
            </div>
        </div>
    );
}