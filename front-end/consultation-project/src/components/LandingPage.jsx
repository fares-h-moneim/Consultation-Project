import LandingPageText from "./LandingPageText";
import MascotVideo from "./MascotVideo";

export default function LandingPage() {

    return (
        <div className="container-fluid px-0 content" style={{ backgroundColor: "red", height: "92vh" }}>
            <div className="row align-items-center justify-content-center">
                <LandingPageText />
                <MascotVideo />
            </div>
        </div>
    );
}