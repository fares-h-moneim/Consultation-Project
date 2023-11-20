import MascotImage from "./MascotImage";
import SignIn from "./SignIn";

export default function SignInPage() {
    return (
        <div className="container-fluid px-0 content">
            <div className="row align-items-center">
                <MascotImage />
                <SignIn />
            </div>
        </div>
    );
}