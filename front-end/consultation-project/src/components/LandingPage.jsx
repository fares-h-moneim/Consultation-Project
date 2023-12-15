import LandingPageText from "./LandingPageText";
import MascotVideo from "./MascotVideo";

export default function LandingPage() {

    return (
        <div className="container-fluid px-0 content" style={{ height: "92vh", overflow: "hidden hidden" }}>
            <div className="row align-items-center justify-content-center">
                <LandingPageText />
                <MascotVideo />
            </div>
        </div>
    );
}